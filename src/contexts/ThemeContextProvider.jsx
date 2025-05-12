import React, { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
const isDarkTheme = JSON.parse(localStorage.getItem("isDarkMode")) || false

const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(isDarkTheme);
  const [activeTab, setActiveTab] = useState("home")

    useEffect(()=>{
        if (isDarkMode){
            document.documentElement.classList.add("dark")
            localStorage.setItem("isDarkMode", isDarkMode)
          }else{
            document.documentElement.classList.remove("dark")
            localStorage.setItem("isDarkMode", isDarkMode)
        }
    },[isDarkMode])

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, setIsDarkMode, activeTab, setActiveTab }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the context value directly
export const useTheme = () => useContext(ThemeContext);

export default ThemeContextProvider;
