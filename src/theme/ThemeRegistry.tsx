"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PaletteMode } from "@mui/material";
import getTheme from "./theme";

const ThemeToggleContext = createContext(() => {});

export const useThemeToggle = () => useContext(ThemeToggleContext);

const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode | null>(null);

  // load theme mode form local storage
  useEffect(() => {
    const stored = localStorage.getItem("mui-theme");
    if (stored === "light" || stored === "dark") {
      setMode(stored);
    } else {
      setMode("light");
    }
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("mui-theme", next);
      return next;
    });
  };

  const theme = useMemo(() => (mode ? getTheme(mode) : null), [mode]);

  if (!mode || !theme) return null;

  return (
    <ThemeToggleContext.Provider value={toggleTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export default ThemeRegistry;
