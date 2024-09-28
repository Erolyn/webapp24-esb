// ToggleDarkMode.tsx
import React, { useEffect } from "react";

export const ToggleDarkMode = () => {
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "dark-mode",
      document.body.classList.contains("dark-mode") ? "enabled" : "disabled"
    );
  };

  useEffect(() => {
    const darkModePreference = localStorage.getItem("dark-mode");
    if (darkModePreference === "enabled") {
      document.body.classList.add("dark-mode");
    }
  }, []);

  return (
    <button id="toggle-darkmode" onClick={toggleDarkMode}>
      Toggle Dark Mode
    </button>
  );
};

export default ToggleDarkMode;
