// src/containers/global/saga.ts
import JSONFile from "@/json/ledger.json";
import {
  getAttachmentDetail,
  getTokensAttachment,
} from "@/shared/providers/templateSdk";
import { getIPFSIMGAddrPrivate } from "@/shared/utils/getIPFSAddrs";
import { LocalStorageKeys } from "@/shared/utils/localStorageHelpers";
import { getTokenCodes } from "@/shared/utils/tokenCodes";
import { processZipFile } from "@/shared/utils/zipHandler";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { GlobalSelectors } from "./selectors";
import { globalActions } from "./slice";
import { GlobalState, MovieInfo } from "./types";

function* fetchData(): any {
  try {
    // Read the json file
    const data = JSONFile as GlobalState["data"];
    yield put(globalActions.setData(data));

    // After setting data, trigger movie data fetch
    yield put(globalActions.fetchMovieData());
  } catch (error) {
    console.error("Error in fetchData:", error);
  }
}

function* fetchMovieData(): any {
  try {
    const tokenCodes = getTokenCodes();
    console.log("🚀 ~ function*fetchMovieData ~ tokenCodes:", tokenCodes);

    if (!tokenCodes || tokenCodes.length === 0) {
      console.error("No token codes available to fetch movie data");
      return;
    }

    // Create movie info object for The Godfather 4
    const movieInfo: MovieInfo = {
      title: "The Godfather 4",
      director: "Francis Ford Coppola",
      year: 2025,
      duration: "180 minutes",
      genre: "Crime Drama",
      description:
        "The final chapter in the Corleone saga, exploring the family's ultimate reckoning with their past.",
      longDescription:
        "The Godfather 4 brings the legendary Corleone saga to its epic conclusion. Set in modern-day America, the film follows the remaining members of the Corleone family as they face the consequences of decades of power, betrayal, and bloodshed. As new threats emerge from within and without, the family must confront their legacy and decide what it truly means to be a Corleone. This masterful finale weaves together themes of family, loyalty, and redemption while delivering the cinematic grandeur fans have come to expect from the franchise.",
      cast: [
        "Al Pacino",
        "Robert De Niro",
        "Oscar Isaac",
        "Zendaya",
        "John David Washington",
        "Talia Shire",
        "Andy Garcia",
        "Vincent D'Onofrio",
        "Adam Driver",
        "Regina King",
        "Michael Shannon",
        "Thomasin McKenzie",
      ],
      festivals: [
        {
          name: "Cannes Film Festival",
          award: "Palme d'Or Winner",
          year: 2025,
        },
        {
          name: "Venice International Film Festival",
          award: "Golden Lion",
          year: 2025,
          category: "Best Picture",
        },
        {
          name: "Toronto International Film Festival",
          award: "People's Choice Award",
          year: 2025,
        },
        {
          name: "New York Film Festival",
          award: "Opening Night Film",
          year: 2025,
        },
        {
          name: "London Film Festival",
          award: "Best Director",
          year: 2025,
        },
        {
          name: "Rome Film Festival",
          award: "Lifetime Achievement",
          year: 2025,
        },
      ],
      quotes: [
        {
          text: "Every family has its secrets. Ours have shaped the world.",
          author: "Michael Corleone",
        },
        {
          text: "Power is not revealed by striking hard or often, but by striking true.",
          author: "Don Vito Corleone",
        },
        {
          text: "In the end, we are all prisoners of our choices, but some cages are made of gold.",
          author: "Vincent Mancini",
        },
      ],
      totalFractions: 15000,
      pricePerFraction: 0.025, // 0.025 ETH per fraction
      availableFractions: 11250,
    };

    // Initialize movie data object
    const movieData: {
      movieInfo: MovieInfo;
      video: { name: string; blob: Blob } | null;
      images: { name: string; blob: Blob }[];
      documents: { name: string; blob: Blob }[];
    } = {
      movieInfo,
      video: null,
      images: [],
      documents: [],
    };

    // Process all tokens to get their attachments
    for (const token of tokenCodes) {
      try {
        // Fetch attachments for this token
        const response = yield call(getTokensAttachment, {
          tokenCode: token.value,
          page: "1",
          pageSize: "100",
        });

        if (response.content && response.content.length > 0) {
          // Get the last attachment (most recent)
          const lastAttachment = response.content[0];

          // Get detailed attachment info
          const attachmentDetail = yield call(
            getAttachmentDetail,
            lastAttachment.id
          );
          yield put(globalActions.setAttachmentInfo(attachmentDetail));

          // Process attachments based on token name/stream
          if (
            token.name.toLowerCase().includes("movie") ||
            token.name.toLowerCase().includes("video") ||
            token.name.toLowerCase().includes("media")
          ) {
            // Process zip files (containing video and images)
            const zipFiles = attachmentDetail.files?.filter(
              (file: any) => file.filename?.match(/\.(zip)$/i) != null
            );

            if (zipFiles && zipFiles.length > 0) {
              const zipAddr = getIPFSIMGAddrPrivate(zipFiles[0]?.cid ?? "");
              // Get JWT token from localStorage
              const token = localStorage.getItem(LocalStorageKeys.jwtAccessKey);

              // Create fetch options with authorization header if token exists
              const fetchOptions: RequestInit = {};
              if (token) {
                fetchOptions.headers = {
                  Authorization: `Bearer ${token.replace(/"/g, "")}`,
                  "X-LedgerInfo": JSON.stringify({
                    tx_hash: attachmentDetail.tx_hash,
                    ledger: attachmentDetail.ledger,
                  }),
                };
              } else {
                console.error(
                  "No access token found for private IPFS resources"
                );
              }

              // Fetch ZIP file with auth headers
              const zipResponse = yield call(fetch, zipAddr, fetchOptions);

              if (!zipResponse.ok) {
                throw new Error(
                  `Failed to fetch ZIP: ${zipResponse.status} ${zipResponse.statusText}`
                );
              }

              const zipBuffer = yield call([zipResponse, "arrayBuffer"]);
              const processedContent = yield call(processZipFile, zipBuffer);
              console.log(
                "🚀 ~ function*fetchMovieData ~ processedContent:",
                processedContent
              );

              if (
                processedContent.type === "movie-content" ||
                processedContent.type === "property-documentation"
              ) {
                // Add images from the zip file
                if (processedContent.content.images) {
                  movieData.images = processedContent.content.images;
                }

                // Add video from the zip file
                if (processedContent.content.video) {
                  movieData.video = processedContent.content.video;
                }

                // Merge movie info from JSON if available
                if (processedContent.content.movieInfo) {
                  movieData.movieInfo = {
                    ...movieData.movieInfo,
                    ...processedContent.content.movieInfo,
                  };
                }
              }
            }

            // Also check for video files directly
            const videoFiles = attachmentDetail.files?.filter(
              (file: any) =>
                file.filename?.match(/\.(mp4|mov|avi|webm)$/i) != null
            );

            if (videoFiles && videoFiles.length > 0) {
              for (const videoFile of videoFiles) {
                if (videoFile.cid) {
                  const videoUrl = getIPFSIMGAddrPrivate(videoFile.cid);
                  const token = localStorage.getItem(
                    LocalStorageKeys.jwtAccessKey
                  );

                  // Create fetch options with authorization header if token exists
                  const fetchOptions: RequestInit = {};
                  if (token) {
                    fetchOptions.headers = {
                      Authorization: `Bearer ${token.replace(/"/g, "")}`,
                      "X-LedgerInfo": JSON.stringify({
                        tx_hash: attachmentDetail.tx_hash,
                        ledger: attachmentDetail.ledger,
                      }),
                    };
                  }

                  // Fetch video with auth headers
                  const videoResponse = yield call(
                    fetch,
                    videoUrl,
                    fetchOptions
                  );

                  if (!videoResponse.ok) {
                    console.warn(
                      `Failed to fetch video: ${videoResponse.status} ${videoResponse.statusText}`
                    );
                    continue;
                  }

                  const videoBlob = yield call([videoResponse, "blob"]);
                  movieData.video = {
                    name: videoFile.filename || "The Godfather 4 Trailer",
                    blob: videoBlob,
                  };
                  break; // Use first video found
                }
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error processing token ${token.name}:`, error);
      }
    }

    // Set the movie data in the global state
    yield put(globalActions.setMovieData(movieData));
  } catch (error) {
    console.error("Error in fetchMovieData:", error);
  }
}

function* logOut(): any {
  try {
    const authData = (yield select(
      GlobalSelectors.authData
    )) as GlobalState["authData"];
    if (authData) {
      yield call(authData.logout);
    }
  } catch (error) {
    console.log("error in logOut", error);
  }
}

export function* globalSaga() {
  yield takeLatest(globalActions.fetchData, fetchData);
  yield takeLatest(globalActions.fetchMovieData, fetchMovieData);
  yield takeLatest(globalActions.logOut, logOut);
}
