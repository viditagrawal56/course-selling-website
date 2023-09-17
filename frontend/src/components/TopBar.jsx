import React from "react";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
const TopBar = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#499bff",
          }}
        >
          <Typography variant="h6">
            <Link
              style={{
                color: "inherit",
                listStyle: "none",
                textDecoration: "none",
              }}
              to="/"
            >
              Coursera
            </Link>
          </Typography>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Link
              style={{
                color: "inherit",
                listStyle: "none",
                textDecoration: "none",
              }}
              to="/Signup"
            >
              <Button variant="contained">Sign Up</Button>
            </Link>
            <Link
              style={{
                color: "inherit",
                listStyle: "none",
                textDecoration: "none",
              }}
              to="/Login"
            >
              <Button variant="contained">Log In</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopBar;
