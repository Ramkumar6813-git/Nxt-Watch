import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContextProvider";
import { FaMoon, FaFire, FaHome, FaGamepad } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { IoMdSunny } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import { MdPlaylistAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode, activeTab, setActiveTab } = useTheme();
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    localStorage.removeItem("hasShownToast");
    navigate("/login");
  };

  return (
    <nav className="fixed w-full z-20 top-0 transition-all duration-300 ease-in-out flex justify-between items-center py-3 px-6 md:px-12 lg:px-16 shadow-md bg-white dark:bg-gray-900">
      {/* Logo */}
      <div className="text-3xl">
        <Link to="/">
          <img
            src={
              isDarkMode
                ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            }
            alt="logo"
            className="h-10"
          />
        </Link>
      </div>
      {/* Small Device Nav Buttons */}
      <div className="flex items-center gap-4 text-xl">
        <button
          onClick={toggleDarkMode}
          className="text-gray-600 dark:text-gray-300 cursor-pointer hover:scale-120"
        >
          {isDarkMode ? (
            <IoMdSunny className="md:text-2xl" />
          ) : (
            <FaMoon className="md:text-2xl" />
          )}
        </button>
        <button
          onClick={() => setShowNavLinks(!showNavLinks)}
          className="text-gray-600 dark:text-gray-300 md:hidden"
        >
          <IoMdMenu />
        </button>
        <button
          className="text-red-600 dark:text-red-400 md:border-1 md:px-2 md:py-1 border-red-600 dark:border-red-400 hover:md:bg-red-600 hover:md:text-white md:rounded-sm transition-colors duration-100 cursor-pointer"
          onClick={() => setIsLogoutModalOpen(true)}
        >
          <RxExit className="md:hidden" />
          <p className="hidden md:block pb-1">Logout</p>
        </button>
      </div>

      {/* Logout Modal */}
      <Popup
        open={isLogoutModalOpen}
        closeOnDocumentClick
        onClose={() => setIsLogoutModalOpen(false)}
        contentStyle={{
          background: isDarkMode ? "#1f2937" : "#ffffff",
          padding: "2rem 1.5rem",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "90%",
          maxWidth: "400px",
          textAlign: "center",
          position: "relative",
          zIndex: 1000,
        }}
        overlayStyle={{
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
        }}
      >
        <div className="text-gray-800 dark:text-gray-200">
          <h2 className="text-xl md:text-xl font-semibold mb-8">
            Are you sure you want to logout?
          </h2>
          <div className="flex justify-center gap-8">
            <button
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              No
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white cursor-pointer rounded-md hover:bg-red-700 transition-colors"
              onClick={handleLogout}
            >
              Yes
            </button>
          </div>
        </div>
      </Popup>

      {/* Small Device Navigation Links */}
      <div
        className={`absolute top-0 left-0 w-full h-screen bg-gray-100 dark:bg-gray-900 transition-transform duration-300 md:hidden ${
          showNavLinks ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setShowNavLinks(false)}
            className="text-gray-600 dark:text-gray-300 text-3xl mr-8 mt-1"
          >
            <IoClose />
          </button>
        </div>
        <ul className="w-full text-xl text-gray-700 dark:text-gray-300">
          <Link
            to="/"
            onClick={() => {
              setShowNavLinks(false);
              setActiveTab("home");
            }}
          >
            <li className="p-4 flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <FaHome
                className={`text-2xl ${activeTab === "home" && "text-red-600"}`}
              />
              Home
            </li>
          </Link>
          <Link
            to="/trending"
            onClick={() => {
              setShowNavLinks(false);
              setActiveTab("trending");
            }}
          >
            <li className="p-4 flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <FaFire
                className={`text-2xl ${
                  activeTab === "trending" && "text-red-600"
                }`}
              />
              Trending
            </li>
          </Link>
          <Link
            to="/gaming"
            onClick={() => {
              setShowNavLinks(false);
              setActiveTab("gaming");
            }}
          >
            <li className="p-4 flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <FaGamepad
                className={`text-2xl ${
                  activeTab === "gaming" && "text-red-600"
                }`}
              />
              Gaming
            </li>
          </Link>
          <Link
            to="/saved-videos"
            onClick={() => {
              setShowNavLinks(false);
              setActiveTab("saved");
            }}
          >
            <li className="p-4 flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <MdPlaylistAdd
                className={`text-2xl ${
                  activeTab === "saved" && "text-red-600"
                }`}
              />
              Saved Videos
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
