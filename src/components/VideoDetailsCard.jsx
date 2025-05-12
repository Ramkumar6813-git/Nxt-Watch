import React from "react";
import { Link } from "react-router-dom";

const VideoDetailsCard = ({ videoDetails }) => {
  if (!videoDetails) return null; // Prevent rendering if no data is provided

  return (
    <Link
      to={`/video-details/${videoDetails.id}`}
      className="shadow-lg dark:shadow-[0px_5px_0px_2px_rgba(255,255,255,0.2)] group bg-transparent"
    >
      {/* Thumbnail */}
      <div className="rounded-xl overflow-hidden relative w-full">
        {videoDetails.thumbnail_url && (
          <img
            src={videoDetails.thumbnail_url}
            alt={videoDetails.title || "Video Thumbnail"}
            className="w-full rounded-lg transition-transform duration-200 group-hover:scale-105"
          />
        )}
      </div>

      {/* Channel & Info */}
      <div className="flex mt-2 gap-3 p-3">
        {videoDetails.channel?.profile_image_url && (
          <img
            src={videoDetails.channel.profile_image_url}
            alt={videoDetails.channel.name || "Channel"}
            className="w-10 h-10 rounded-full"
          />
        )}
        <div className="flex-1 space-y-2">
          <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm line-clamp-2">
            {videoDetails.title || "Untitled Video"}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-xs">
            {videoDetails.channel?.name || "Unknown Channel"}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            {videoDetails.view_count
              ? `${videoDetails.view_count} views • `
              : ""}
            {videoDetails.published_at || "Unknown Date"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoDetailsCard;
