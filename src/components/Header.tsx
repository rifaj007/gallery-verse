"use client";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ThemeToggleButton from "./ThemeToggleButton";
import SearchBar from "./SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

interface HeaderProps {
  setSearchQuery: (query: string) => void;
}

export default function Header({ setSearchQuery }: HeaderProps) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleMobileSearchOpen = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  return (
    <div className="relative">
      <AppBar position="static" color="primary" enableColorOnDark>
        <Container>
          <Toolbar className="gap-2" sx={{ alignItems: "center" }}>
            {/* Logo */}
            <Typography
              component="a"
              href="/"
              sx={{
                mr: 2,
                letterSpacing: ".2rem",
                textDecoration: "none",
                fontWeight: 600,
                flexGrow: 1,
              }}
            >
              Gallery Verse
            </Typography>

            <Box>
              {/* Search bar for desktop */}
              <Box
                sx={{ display: { xs: "none", sm: "inline-flex items-center" } }}
              >
                <SearchBar onSearch={setSearchQuery} />
              </Box>

              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ display: { xs: "inline-block", sm: "none" } }}
                onClick={handleMobileSearchOpen}
              >
                <SearchIcon />
              </IconButton>
              {/* Theme toggler button */}
              <ThemeToggleButton />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile search bar */}
      {mobileSearchOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "64px",
            left: "2rem",
            right: "2rem",
            bgcolor: "secondary.main",
            borderRadius: 2,
            boxShadow: 3,
            zIndex: 10,
            display: { xs: "flex", sm: "none" },
          }}
        >
          <SearchBar onSearch={setSearchQuery} />
        </Box>
      )}
    </div>
  );
}
