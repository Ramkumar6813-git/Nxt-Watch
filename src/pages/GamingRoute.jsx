import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideNavbar from "../components/SideNavbar";
import useFetch from "../customHooks/useFetch";
import { FaGamepad } from "react-icons/fa6";
import "../App.css";

const jwtToken = import.meta.env.VITE_JWT_TOKEN;

const Loader = () => {
  const placeholders = Array.from({ length: 12 });

  return (
    <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white dark:bg-black">
      {placeholders.map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg p-4"
        >
          {/* Thumbnail Skeleton */}
          <div className="h-52 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          {/* Content Skeleton */}
          <div className="mt-4 space-y-3">
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const FailureView = () => (
  <div className="flex flex-col space-y-2 pt-5 text-center items-center mx-auto max-w-md">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      alt="failure view"
      className="w-full max-w-64 md:max-w-80"
    />
    <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">
      Oops! Something Went Wrong
    </h1>
    <p className="text-md text-gray-600 dark:text-gray-400">
      We are having trouble completing your request. Please try again.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-colors rounded-sm text-white"
    >
      Retry
    </button>
  </div>
);

const NoData = () => (
  <div className="flex flex-col space-y-2 pt-5 text-center items-center mx-auto max-w-md">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
      alt="no videos"
      className="w-full max-w-64 md:max-w-80"
    />
    <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">
      No Search Results Found
    </h1>
    <p className="text-md text-gray-600 dark:text-gray-400">
      Try different keywords or remove search filters.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-colors rounded-sm text-white"
    >
      Retry
    </button>
  </div>
);

const DisplayVideosData = ({ videos }) => {
  if (!videos?.length) return <NoData />;

  return (
    <div className="p-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 bg-white dark:bg-black">
      {videos.map((video) => (
        <Link key={video.id} to={`/video-details/${video.id}`}>
          <div className="shadow-md rounded-md bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-200">
            <img
              src={video.thumbnail_url}
              alt={video.title}
              className="w-full h-auto rounded-t-md"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {video.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {video.view_count} Watching
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const GamingRoute = () => {
  const url = "https://apis.ccbp.in/videos/gaming";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const { apiData, apiStatus } = useFetch({ url, options });

  const renderVideos = () => {
    switch (apiStatus) {
      case "IN_PROGRESS":
        return <Loader />;
      case "SUCCESS":
        return <DisplayVideosData videos={apiData?.videos} />;
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
            <FaGamepad className="size-6 md:size-8 text-red-600" />
          </div>
          <h1 className="text-xl md:text-2xl text-gray-900 dark:text-white font-semibold">
            Gaming
          </h1>
        </section>
        <section>{renderVideos()}</section>
      </main>
    </div>
  );
};

export default GamingRoute;
