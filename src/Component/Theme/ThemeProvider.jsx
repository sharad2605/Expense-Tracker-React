import React from "react";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className={`${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"} min-vh-100`}>
      {children}
    </div>
  );
};

export default ThemeProvider;