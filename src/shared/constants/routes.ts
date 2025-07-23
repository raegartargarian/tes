export const appRoutes = {
  dashboard: {
    name: "dashboard",
    path: "/",
  },
  about: {
    name: "about",
    path: "/about",
  },
  seeTheFilm: {
    name: "seeTheFilm",
    path: "/see-the-film",
  },
  getInvolved: {
    name: "getInvolved",
    path: "/get-involved",
  },
  filmmakers: {
    name: "filmmakers",
    path: "/filmmakers",
  },
  press: {
    name: "press",
    path: "/press",
  },
  store: {
    name: "store",
    path: "/store",
  },
  // Keep legacy routes for backward compatibility
  property: {
    name: "property",
    path: "/property",
  },
  location: {
    name: "location",
    path: "/location",
  },
  documents: {
    name: "documents",
    path: "/documents",
  },
  attachments: {
    path: "/attachments",
  },
  attachmentsDetail: {
    path: "/attachments/:id",
    name: "/attachments/",
  },
};
