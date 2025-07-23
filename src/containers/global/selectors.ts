// src/containers/global/selectors.ts
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/types";

export const GlobalDomains = {
  root: (state: RootState) => state,
  data: (state: RootState) => state?.global.data,
  movieData: (state: RootState) => state?.global.movieData,
};

export const GlobalSelectors = {
  data: createSelector(GlobalDomains.data, (data) => data),
  movieData: createSelector(GlobalDomains.movieData, (movieData) => movieData),
  isAuthModalOpen: createSelector(
    GlobalDomains.root,
    (root) => root.global.isAuthModalOpen
  ),
  isPurchaseModalOpen: createSelector(
    GlobalDomains.root,
    (root) => root.global.isPurchaseModalOpen
  ),
  authData: createSelector(GlobalDomains.root, (root) => root.global.authData),
  attachmentInfo: createSelector(
    GlobalDomains.root,
    (root) => root.global.attachmentInfo
  ),
};
