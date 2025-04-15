"use client";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import ThemeToggleButton from "./ThemeToggleButton";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Container>
        <Toolbar className="gap-2">
          <Typography variant="h6" component="div">
            Gallery Verse
          </Typography>

          <SearchBar />

          <ThemeToggleButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
