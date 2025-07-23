// src/shared/utils/zipHandler.ts
import JSZip from "jszip";

interface ProcessedContent {
  type: string;
  content: {
    images?: { name: string; blob: Blob }[];
    video?: { name: string; blob: Blob };
    documents?: { name: string; blob: Blob }[];
    movieInfo?: any;
    propertyInfo?: any;
  };
}

export const processZipFile = async (
  buffer: ArrayBuffer
): Promise<ProcessedContent> => {
  const zip = new JSZip();
  const zipContent = await zip.loadAsync(buffer);

  const result: ProcessedContent = {
    type: "unknown",
    content: {
      images: [],
      documents: [],
    },
  };

  const images: { name: string; blob: Blob }[] = [];
  const documents: { name: string; blob: Blob }[] = [];
  let video: { name: string; blob: Blob } | undefined;
  let movieInfo: any;
  let propertyInfo: any;

  // Process each file in the ZIP
  for (const filename in zipContent.files) {
    const file = zipContent.files[filename];

    if (file.dir) continue; // Skip directories

    try {
      // Check file type by extension
      const extension = filename.toLowerCase().split(".").pop();

      if (
        ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(extension || "")
      ) {
        // Image file
        const blob = await file.async("blob");
        images.push({ name: filename, blob });
      } else if (
        ["mp4", "mov", "avi", "webm", "mkv", "flv"].includes(extension || "")
      ) {
        // Video file - take the first one found
        if (!video) {
          const blob = await file.async("blob");
          video = { name: filename, blob };
        }
      } else if (["pdf", "doc", "docx", "txt"].includes(extension || "")) {
        // Document file
        const blob = await file.async("blob");
        documents.push({ name: filename, blob });
      } else if (extension === "json") {
        // JSON file - try to parse for movie/property info
        const text = await file.async("text");
        try {
          const jsonData = JSON.parse(text);

          // Check if it looks like movie data
          if (jsonData.title || jsonData.director || jsonData.movieInfo) {
            movieInfo = jsonData.movieInfo || jsonData;
            result.type = "movie-content";
          } else if (jsonData.propertyInfo || jsonData.nameOfProject) {
            // Legacy property data
            propertyInfo = jsonData.propertyInfo || jsonData;
            result.type = "property-documentation";
          }
        } catch (error) {
          console.warn(`Failed to parse JSON file ${filename}:`, error);
        }
      }
    } catch (error) {
      console.warn(`Failed to process file ${filename}:`, error);
    }
  }

  // Set the processed content
  result.content.images = images;
  result.content.documents = documents;

  if (video) {
    result.content.video = video;
    result.type = "movie-content"; // If we have video, it's movie content
  }

  if (movieInfo) {
    result.content.movieInfo = movieInfo;
    result.type = "movie-content";
  }

  if (propertyInfo) {
    result.content.propertyInfo = propertyInfo;
    if (result.type === "unknown") {
      result.type = "property-documentation";
    }
  }

  // If we have images but no specific type, assume it's documentation
  if (result.type === "unknown" && images.length > 0) {
    result.type = video ? "movie-content" : "property-documentation";
  }

  return result;
};
