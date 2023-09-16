import React from "react";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

const TopBar = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Coursera</Typography>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Button variant="contained">Sign Up</Button>
            <Button variant="contained">Log In</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopBar;
