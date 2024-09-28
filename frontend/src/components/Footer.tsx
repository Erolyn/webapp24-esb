import React from "react";

export type FooterProps = {
  onToggleDarkMode: () => void;
};

export default function Footer({ onToggleDarkMode }: FooterProps) {
  return (
    <footer>
      <p>&copy; 2024 Elise Brun</p>
      <button id="toggle-darkmode" onClick={onToggleDarkMode}>
        Toggle Dark Mode
      </button>
    </footer>
  );
}
