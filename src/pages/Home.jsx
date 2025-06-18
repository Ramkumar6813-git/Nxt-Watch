import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SideNavbar from "../components/SideNavbar";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import useFetch from "../customHooks/useFetch";
import VideoDetailsCard from "../components/VideoDetailsCard";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import { useTheme } from "../contexts/ThemeContextProvider";

const jwtToken = import.meta.env.VITE_JWT_TOKEN;

const Home = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [startSearch, setStartSearch] = useState("");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const hasShownToast = localStorage.getItem("hasShownToast");

    if (!hasShownToast) {
      toast.success("Login Successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: isDarkMode ? "dark" : "light",
      });

      localStorage.setItem("hasShownToast", "true");
    }
  }, []);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  

  const url = `https://apis.ccbp.in/videos/all?search=${startSearch}`;
  const { apiData, apiStatus } = useFetch({ url, options });

  const Loader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg p-4"
        >
          <div className="h-52 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          <div className="mt-4 space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const FailureView = () => (
    <div className="flex flex-col items-center text-center space-y-4 p-6">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="no-videos"
        className="w-60"
      />
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Oops! Something Went Wrong
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        onClick={() => {
          setStartSearch("");
          setSearchInput("");
        }}
      >
        Retry
      </button>
    </div>
  );

  const NoData = () => (
    <div className="flex flex-col items-center text-center space-y-4 p-6">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no-videos"
        className="w-60"
      />
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        No Search results found
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Try different keywords or remove search filter
      </p>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        onClick={() => {
          setStartSearch("");
          setSearchInput("");
        }}
      >
        Retry
      </button>
    </div>
  );

  const DisplayVideosData = ({ apiData }) => (
    <div className="p-4">
      {apiData?.videos?.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {apiData.videos.map((video) => (
            <VideoDetailsCard key={video.id} videoDetails={video} />
          ))}
        </section>
      ) : (
        <section className="flex justify-center items-center">
          <NoData />
        </section>
      )}
    </div>
  );

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

  const handleSearchInput = () => {
    setStartSearch(searchInput);
  };

  return (
    <>
      <ToastContainer />

      <div className="flex min-h-screen">
        <Navbar />
        <SideNavbar />
        <main className="flex-1 mt-16 md:ml-60 bg-white dark:bg-gray-800 overflow-y-auto">
          {/*Banner* */}
          {showBanner && (
            <div
              className="relative flex justify-between items-start p-6 bg-cover"
              style={{
                backgroundImage:
                  "url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png')",
              }}
            >
              <div className="space-y-3">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="Banner"
                  className="w-44"
                />
                <h1 className="text-xl font-semibold">
                  Buy Nxt Watch Premium prepaid plans with UPI
                </h1>
                <button className="border border-gray-800 px-4 py-2">
                  GET IT NOW
                </button>
              </div>
              <IoClose
                onClick={() => setShowBanner(false)}
                className="text-black dark:text-white text-2xl cursor-pointer"
              />
            </div>
          )}

          {/**Search Input Field */}
          <div className="flex items-center gap-2 px-4 py-3 max-w-md mt-2">
            <input
              type="search"
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded focus:outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchInput();
                }
              }}
            />
            <button
              className="p-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-100 rounded"
              onClick={handleSearchInput}
            >
              <IoSearchSharp />
            </button>
          </div>

          {renderVideosData()}
        </main>
      </div>
    </>
  );
};

export default Home;
