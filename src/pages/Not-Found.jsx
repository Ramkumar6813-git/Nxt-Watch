import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-800 text-white">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-lg text-gray-400">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
