/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "@reduxjs/toolkit";
import { globalReducer } from "../containers/global/slice";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer() {
  return combineReducers({
    global: globalReducer,
  });
}
