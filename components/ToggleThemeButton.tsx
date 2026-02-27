"use client";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  console.log(theme);
  return (
    <button
      onClick={toggleTheme}
      className="p-2 border rounded cursor-pointer"
    >
      Change theme | {theme}
    </button>
  );
}