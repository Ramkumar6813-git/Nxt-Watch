import Navbar from "../components/Navbar";
import SideNavbar from "../components/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteAllSavedVideos } from "../contexts/SavedVideosSlice";

const NoVideos = () => (
  <div className="flex-1 mt-[64px] md:ml-20 p-4 overflow-y-auto bg-white dark:bg-gray-800">
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="w-full max-w-96 mb-10"
      />
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
        No saved videos found
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
        You can save your videos while watching them
      </p>
    </div>
  </div>
);

const SavedVideos = () => {
  const { savedVideos } = useSelector((store) => store.videos);
  const dispatch = useDispatch()

  return (
    <div className="flex min-h-screen overflow-hidden tranition-all duration-500">
      <Navbar />
      <SideNavbar />
      <div className="flex-1 mt-[64px] md:ml-60 p-4 overflow-y-auto bg-white dark:bg-gray-800">
        {/* Banner */}
        <div className="my-3 p-4 flex items-center space-x-4 w-full bg-gray-100 dark:bg-gray-700 rounded-md">
          <div className="bg-gray-300 dark:bg-gray-900 p-3 rounded-full">
            <FaFire className="size-6 md:size-8 text-red-600" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            Saved Videos
          </h1>
          <button
            onClick={() => dispatch(deleteAllSavedVideos())}
            className="ml-auto text-amber-600 font-semibold dark:text-amber-400 md:border-1 md:px-2 md:py-1 border-amber-600 dark:border-amber-400 hover:md:bg-amber-600 hover:md:text-white md:rounded-sm transition-colors duration-100 cursor-pointer"
          >
            Delete
          </button>
        </div>

        {/* Video List or NoVideos */}
        {savedVideos.length > 0 ? (
          savedVideos.map((video) => {
            const {
              id,
              title,
              thumbnail_url,
              channel,
              view_count,
              published_at,
            } = video;

            return (
              <Link to={`/video-details/${id}`} key={id}>
                <div className="shadow-md hover:shadow-lg dark:shadow-gray-700 rounded-sm flex flex-col lg:flex-row p-4 mb-6 bg-white dark:bg-gray-900">
                  <img
                    src={thumbnail_url}
                    alt={title}
                    className="w-full lg:w-80 object-cover rounded-md"
                  />
                  <div className="flex p-4 gap-4">
                    <img
                      src={channel.profile_image_url}
                      alt={`${channel.name} logo`}
                      className="w-10 h-10 rounded-full display-block lg:hidden"
                    />
                    <div className="flex flex-col justify-between md:justify-start">
                      <h2 className="text-md md:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        {title}
                      </h2>
                      <div className="flex flex-wrap text-sm md:text-md md:mt-6 text-gray-600 dark:text-gray-400 space-x-3">
                        <span>{channel.name}</span>
                        <span>&bull;</span>
                        <span>{view_count} views</span>
                        <span>&bull;</span>
                        <span>{published_at}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <NoVideos />
        )}
      </div>
    </div>
  );
};

export default SavedVideos;
