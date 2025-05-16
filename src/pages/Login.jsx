import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContextProvider";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();

  const logo = isDarkMode
    ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
    : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginUrl = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(loginUrl, options);
      const data = await response.json();
      if (response.ok) {
        Cookies.set("jwt_token", data.jwt_token, { expires: 30 });
        navigate("/", { replace: true });
      } else {
        setError(data.error_msg);
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (Cookies.get("jwt_token")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-stone-100 dark:bg-neutral-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-black p-8 rounded-lg shadow-[0px_0px_10px_10px_rgba(0,0,0,0.1)] dark:shadow-[0px_0px_10px_10px_rgba(255,255,255,0.1)] transition-all"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="App Logo" className="w-40 h-auto" />
        </div>

        {/* Username Field */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="rahul"
            autoComplete="username"
            onChange={handleChange}
            value={userDetails.username}
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="rahul@2021"
            autoComplete="current-password"
            onChange={handleChange}
            value={userDetails.password}
            required
          />
        </div>

        {/* Show Password */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="show-password"
            className="mr-2 accent-blue-600"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label
            htmlFor="show-password"
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            Show Password
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
        >
          Login
        </button>

        {/* Error Message */}
        {error && (
          <p className="mt-3 text-red-600 text-sm font-medium">*{error}</p>
        )}
      </form>
    </div>
  );
}
