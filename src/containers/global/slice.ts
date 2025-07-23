// src/containers/global/slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalState } from "./types";

const initialState: GlobalState = {
  data: null,
  movieData: null,
  isAuthModalOpen: false,
  isPurchaseModalOpen: false,
  attachmentInfo: null,
};

// global slice
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<GlobalState["data"]>) => {
      state.data = action.payload;
    },
    setAuthData: (state, action: PayloadAction<GlobalState["authData"]>) => {
      state.authData = action.payload;
    },
    fetchData: (_state) => {
      // fetch user data
    },

    setIsAuthModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAuthModalOpen = action.payload;
    },
    setIsPurchaseModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isPurchaseModalOpen = action.payload;
    },
    // New actions for movie data
    fetchMovieData: (_state) => {
      // Will be handled in saga
    },
    setMovieData: (state, action: PayloadAction<GlobalState["movieData"]>) => {
      state.movieData = action.payload;
    },
    logOut: (_state) => {
      // logout user
    },
    setAttachmentInfo: (
      state,
      action: PayloadAction<GlobalState["attachmentInfo"]>
    ) => {
      state.attachmentInfo = action.payload;
    },
  },
});

export const { actions: globalActions, reducer: globalReducer } = globalSlice;
