import React from "react";
import { Box, Typography, TextField, Button, Card } from "@mui/material";

const SignUp = () => {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "#eeee",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Welcome To Coursera Please Sign in</Typography>
        <Card
          variant="outlined"
          sx={{
            minWidth: 500,
            backgroundColor: "#ffff",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
            padding: "2rem",
          }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <Button variant="contained">Sign Up</Button>
        </Card>
      </Box>
    </>
  );
};

export default SignUp;
