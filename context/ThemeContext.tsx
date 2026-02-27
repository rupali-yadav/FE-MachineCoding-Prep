"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type themeType = "light" | "dark" | undefined;

type ThemeContextType = {
    theme: themeType;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

    const [theme, setTheme] = useState<themeType | undefined>(undefined);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => prev === "light" ? "dark" : "light");
    }, []);

    // on theme change
    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
            root.classList.remove("light");
        } else {
            root.classList.remove("dark");
            root.classList.add("light");
        }
    }, [theme]);

    // onLoad
    useEffect(() => {
        // option 1: everytime theme changes save it to local storage in above useffect
        // and read it here

        // option 2: read the theme from system and set it let's go with option 2
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
};


export const useTheme = () => {

    const context = useContext(ThemeContext);

    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}