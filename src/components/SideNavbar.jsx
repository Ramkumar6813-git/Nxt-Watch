import React from "react";
import { Link } from "react-router-dom";
import { FaFire, FaHome, FaGamepad } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import { useTheme } from "../contexts/ThemeContextProvider";

const SideNavbar = () => {
  const { activeTab, setActiveTab } = useTheme();
  return (
    <div className="hidden md:flex md:flex-col md:fixed md:left-0 md:top-[64px] md:h-[calc(100vh-64px)] md:w-60 bg-neutral-100 text-gray-700 dark:bg-gray-900 dark:text-white p-4">
      <ul className="space-y-4">
        <Link
          to="/"
          onClick={() => {
            setActiveTab("home");
          }}
        >
          <li className="nav-links">
            <FaHome
              className={`text-2xl ${activeTab === "home" && "text-red-600"}`}
            />
            Home
          </li>
        </Link>
        <Link
          to="/trending"
          onClick={() => {
            setActiveTab("trending");
          }}
        >
          <li className="nav-links">
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
            setActiveTab("gaming");
          }}
        >
          <li className="nav-links">
            <FaGamepad
              className={`text-2xl ${activeTab === "gaming" && "text-red-600"}`}
            />
            Gaming
          </li>
        </Link>
        <Link
          to="/saved-videos"
          onClick={() => {
            setActiveTab("saved");
          }}
        >
          <li className="nav-links">
            <MdPlaylistAdd
              className={`text-2xl ${activeTab === "saved" && "text-red-600"}`}
            />
            Saved Videos
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SideNavbar;
