"use client";
import { createTheme, PaletteMode } from "@mui/material";

const getTheme = (mode: PaletteMode) =>
  createTheme({
    typography: {
      fontFamily: "var(--font-roboto)",
    },
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // 🌞 Light Mode Colors
            primary: {
              main: "#1976d2",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#9c27b0",
              contrastText: "#ffffff",
            },
            background: {
              default: "#f5f7fa",
              paper: "#ffffff",
            },
            text: {
              primary: "#fff",
              secondary: "#555555",
            },
          }
        : {
            // 🌚 Dark Mode Colors
            primary: {
              main: "#90caf9",
              contrastText: "#0d1117",
            },
            secondary: {
              main: "#ce93d8",
              contrastText: "#0d1117",
            },
            background: {
              default: "#0d1117",
              paper: "#1a1a1a",
            },
            text: {
              primary: "#000",
              secondary: "#a0a0a0",
            },
          }),
    },
    components: {},
    cssVariables: true,
  });

export default getTheme;
