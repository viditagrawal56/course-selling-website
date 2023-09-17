import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, TextField, Button, Card } from "@mui/material";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        <Typography variant="h5">
          Welcome To Coursera, Please Sign up
        </Typography>
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
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            fullWidth
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <Button
            variant="contained"
            onClick={() => {
              fetch("http://localhost:3000/admin/signup", {
                method: "POST",
                body: JSON.stringify({
                  username: username,
                  password: password,
                }),
                headers: {
                  "Content-type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                });
            }}
          >
            Sign Up
          </Button>
          {username}
          {password}
        </Card>
      </Box>
    </>
  );
};

export default SignUp;
