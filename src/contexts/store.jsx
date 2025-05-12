import { configureStore } from "@reduxjs/toolkit";
import savedVidoes from "./SavedVideosSlice"

const store = configureStore({
  reducer: {
    videos: savedVidoes,
  },
});

export default store