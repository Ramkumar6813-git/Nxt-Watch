import { createSlice } from "@reduxjs/toolkit";

const savedVideos = JSON.parse(localStorage.getItem("saved_videos")) || [];
const videoLikes = JSON.parse(localStorage.getItem("video_likes")) || {};

const SavedVideos = createSlice({
  name: "videos",
  initialState: {
    savedVideos,
    videoLikes, // { id: { isLiked: boolean, isDisliked: boolean } }
  },
  reducers: {
    addToSaved: (state, action) => {
      const videoId = action.payload.id;
      state.savedVideos.push({
        ...action.payload,
        isLiked: state.videoLikes[videoId]?.isLiked || false,
        isDisliked: state.videoLikes[videoId]?.isDisliked || false,
      });
      localStorage.setItem("saved_videos", JSON.stringify(state.savedVideos));
    },
    removeFromSaved: (state, action) => {
      state.savedVideos = state.savedVideos.filter(
        (video) => video.id !== action.payload
      );
      localStorage.setItem("saved_videos", JSON.stringify(state.savedVideos));
    },
    handleLike: (state, action) => {
      const videoId = action.payload;
      state.videoLikes[videoId] = {
        isLiked: !state.videoLikes[videoId]?.isLiked,
        isDisliked: false, // Reset dislike
      };
      // Update saved video if it exists
      const savedVideo = state.savedVideos.find((v) => v.id === videoId);
      if (savedVideo) {
        savedVideo.isLiked = state.videoLikes[videoId].isLiked;
        savedVideo.isDisliked = false;
      }
      localStorage.setItem("video_likes", JSON.stringify(state.videoLikes));
      localStorage.setItem("saved_videos", JSON.stringify(state.savedVideos));
    },
    handleDislike: (state, action) => {
      const videoId = action.payload;
      state.videoLikes[videoId] = {
        isLiked: false, // Reset like
        isDisliked: !state.videoLikes[videoId]?.isDisliked,
      };
      // Update saved video if it exists
      const savedVideo = state.savedVideos.find((v) => v.id === videoId);
      if (savedVideo) {
        savedVideo.isDisliked = state.videoLikes[videoId].isDisliked;
        savedVideo.isLiked = false;
      }
      localStorage.setItem("video_likes", JSON.stringify(state.videoLikes));
      localStorage.setItem("saved_videos", JSON.stringify(state.savedVideos));
    },
    deleteAllSavedVideos: (state) => {
      state.savedVideos = [];
      localStorage.setItem("saved_videos", JSON.stringify([]));
    },
  },
});

export const {
  addToSaved,
  removeFromSaved,
  handleLike,
  handleDislike,
  deleteAllSavedVideos,
} = SavedVideos.actions;
export default SavedVideos.reducer;
