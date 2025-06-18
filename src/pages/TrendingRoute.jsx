import Navbar from "../components/Navbar";
import SideNavbar from "../components/SideNavbar";
import VideoDetailsCard from "../components/VideoDetailsCard";
import useFetch from "../customHooks/useFetch";
import { FaFire } from "react-icons/fa";
import "../App.css";

import  Cookies  from "js-cookie";

const jwtToken = Cookies.get("jwt_token");

const Loader = () => {
  const rangeArray = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="bg-white dark:bg-black p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {rangeArray.map((index) => (
        <div
          key={index}
          className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg p-4"
        >
          {/* Thumbnail Skeleton */}
          <div className="h-52 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          {/* Content Skeleton */}
          <div className="mt-4 space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const FailureView = () => (
  <div className="flex flex-col space-y-2 mt-20 -5 text-center items-center mx-auto max-w-md">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      alt="no-videos"
      className="w-full max-w-64 md:max-w-82"
    />
    <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">
      Oops! Something Went Wrong
    </h1>
    <p className="text-md text-gray-600 dark:text-gray-400">
      We are having some trouble completing your request. Please try again.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-5 py-2 mt-2 bg-indigo-600 hover:bg-indigo-800 rounded text-white"
    >
      Retry
    </button>
  </div>
);

const NoData = () => (
  <div className="flex flex-col space-y-2 mt-15  pt-5 text-center items-center mx-auto max-w-md">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
      alt="no-videos"
      className="w-full max-w-64 md:max-w-82"
    />
    <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
      No Search Results Found
    </h1>
    <p className="text-md text-gray-600 dark:text-gray-400">
      Try different keywords or remove search filter
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-5 py-2 mt-2 bg-indigo-600 hover:bg-indigo-800 rounded text-white"
    >
      Retry
    </button>
  </div>
);

const DisplayVideosData = ({ apiData }) => {
  const videos = apiData?.videos || [];

  if (videos.length === 0) {
    return <NoData />;
  }

  return (
    <div className="bg-white dark:bg-black p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {videos.map((video) => (
        <VideoDetailsCard key={video.id} videoDetails={video} />
      ))}
    </div>
  );
};

const TrendingRoute = () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const url = `https://apis.ccbp.in/videos/trending`;
  const { apiData, apiStatus } = useFetch({ url, options });

  const renderVideosData = () => {
    switch (apiStatus) {
      case "IN_PROGRESS":
        return <Loader />;
      case "SUCCESS":
        return <DisplayVideosData apiData={apiData} />;
      case "FAILURE":
        return <FailureView />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-white dark:bg-gray-900">
      {/* Fixed Navbar */}
      <Navbar className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-800 shadow-md" />

      {/* Sidebar Navigation */}
      <SideNavbar />

      {/* Main Content Area */}
      <main className="flex-1 mt-[64px] md:ml-60 p-4 overflow-y-auto">
        <section className="my-3 p-3 flex items-center space-x-3 w-full bg-gray-100 dark:bg-gray-700 rounded-md">
          <div className="bg-gray-300 dark:bg-gray-600 p-2 rounded-full">
            <FaFire className="size-6 md:size-8 text-red-600" />
          </div>
          <h1 className="text-xl md:text-2xl text-gray-900 dark:text-white font-semibold">
            Trending
          </h1>
        </section>
        {/* Video Content */}
        <section>{renderVideosData()}</section>
      </main>
    </div>
  );
};

export default TrendingRoute;
