import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import {
  addToSaved,
  removeFromSaved,
  handleLike,
  handleDislike,
} from "../contexts/SavedVideosSlice";
import useFetch from "../customHooks/useFetch";
import Navbar from "../components/Navbar";
import SideNavbar from "../components/SideNavbar";
import "../App.css";
import Cookies from 'js-cookie';

const jwtToken = Cookies.get("jwt_token");

// Loading Skeleton
const Loader = () => (
  <div className="space-y-6 animate-pulse">
    <div className="aspect-video w-full max-h-[450px] bg-gray-300 rounded-lg"></div>
    <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
    <div className="h-24 w-full bg-gray-300 rounded"></div>
  </div>
);

// Error View
const FailureView = () => (
  <div className="text-center mt-[40%] md:mt-[35%] lg:mt-[25%]">
    <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-5">
      Oops! Something Went Wrong
    </h1>
    <button className="px-5 py-2 mt-1 bg-indigo-600 hover:bg-indigo-800 text-white rounded-sm">
      Retry
    </button>
  </div>
);

// No Data
const NoData = () => (
  <div className="text-center mt-[30%] lg:mt-[20%] flex flex-col items-center gap-5">
    <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
      No Data Found
    </h1>
    <button className="px-5 py-2 mt-1 bg-indigo-600 hover:bg-indigo-800 text-white rounded-sm">
      Retry
    </button>
  </div>
);

// Videos Data
const DisplayVideosData = ({ apiData }) => {
  const { savedVideos, videoLikes } = useSelector((store) => store.videos);
  const dispatch = useDispatch();

  if (!apiData) return <NoData />;

  const {
    id,
    title,
    video_url,
    view_count,
    published_at,
    description,
    channel,
  } = apiData;

  const isSaved = savedVideos.some((video) => video.id === id);
  const isLiked = videoLikes[id]?.isLiked || false;
  const isDisliked = videoLikes[id]?.isDisliked || false;

  const videoPlayer = useMemo(
    () => (
      <ReactPlayer
        url={video_url}
        width="100%"
        height="100%"
        controls
        className="rounded-lg"
      />
    ),
    [video_url]
  );

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch(removeFromSaved(id));
    } else {
      dispatch(addToSaved({ ...apiData }));
    }
  };

  const handleLikeClick = () => {
    dispatch(handleLike(id));
  };

  const handleDislikeClick = () => {
    dispatch(handleDislike(id));
  };

  return (
    <div className="space-y-6">
      <div className="aspect-video w-full max-h-[450px]">{videoPlayer}</div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        {title}
      </h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="text-gray-600 dark:text-gray-300">
          <span>{view_count} views</span>
          <span aria-hidden="true"> • </span>
          <span>{published_at}</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleLikeClick}
            className={`flex items-center gap-1 px-4 py-2 rounded-md ${
              isLiked
                ? "text-blue-800 dark:text-blue-400 font-semibold"
                : "text-gray-600 dark:text-gray-300"
            } hover:bg-gray-100 dark:hover:bg-gray-700`}
          >
            <AiOutlineLike className="text-xl" /> Like
          </button>
          <button
            onClick={handleDislikeClick}
            className={`flex items-center gap-1 px-4 py-2 rounded-md ${
              isDisliked
                ? "text-blue-800 dark:text-blue-400 font-semibold"
                : "text-gray-600 dark:text-gray-300"
            } hover:bg-gray-100 dark:hover:bg-gray-700`}
          >
            <AiOutlineDislike className="text-xl" /> Dislike
          </button>
          <button
            className={`flex items-center gap-1 px-4 py-2 rounded-md ${
              isSaved
                ? "text-blue-800 dark:text-blue-400 font-semibold"
                : "text-gray-600 dark:text-gray-300"
            } hover:bg-gray-100 dark:hover:bg-gray-700`}
            onClick={handleSaveToggle}
          >
            <MdPlaylistAdd className="text-xl" />
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />
      <div className="flex items-center gap-4">
        <img
          src={channel?.profile_image_url}
          alt={`${channel?.name} profile`}
          className="h-12 w-12 rounded-full"
        />
        <div>
          <p className="font-semibold text-gray-800 dark:text-white">
            {channel?.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {channel?.subscriber_count} subscribers
          </p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

// Fetching data and display view
const VideoItemDetails = () => {
  const { id } = useParams();
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
      Accept: "Application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  const url = `https://apis.ccbp.in/videos/${id}`;
  const { apiData, apiStatus } = useFetch({ url, options });

  const renderVideosData = () => {
    switch (apiStatus) {
      case "IN_PROGRESS":
        return <Loader />;
      case "SUCCESS":
        return <DisplayVideosData apiData={apiData.video_details} />;
      case "FAILURE":
        return <FailureView />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <Navbar className="fixed top-0 left-0 w-full bg-white shadow-md" />
      <SideNavbar />
      <div className="flex-1 mt-[64px] md:ml-60 p-4 bg-white dark:bg-gray-800">
        {renderVideosData()}
      </div>
    </div>
  );
};

export default VideoItemDetails;
