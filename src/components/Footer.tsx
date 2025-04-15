"use client";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 2,
        textAlign: "center",
        bgcolor: "primary.main",
      }}
    >
      <Typography variant="body1" color="text.primary">
        © {new Date().getFullYear()} Gallery Verse. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
