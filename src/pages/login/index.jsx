import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Axios from "axios";

function Login({setUsername}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate()

  const submitForm = async () => {
    try {
      const response = await Axios.post("http://localhost:5001/users/login", {
        email: email,
        password: password,
      });
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        console.log(response.data);
        setLoginStatus(true);
        localStorage.setItem("token", response.data.authToken);
        localStorage.setItem("username", response.data.name)
        localStorage.setItem("userid", response.data.id)
        setUsername(response.data.name)
        navigate("/dashboard")
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
      mt={3}
    >
      <Typography variant="h4" mb={2}>
        Login
      </Typography>
      <form
        action=""
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <TextField
          id="email-login-input"
          label="Email"
          variant="outlined"
          sx={{ width: "50%" }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          id="password-login-input"
          label="Password"
          variant="outlined"
          sx={{ width: "50%" }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button color="inherit" onClick={submitForm}>
          Login
        </Button>
        <Typography variant="p" sx={{ fontSize: "11px" }}>
          If you don't have an account yet, register {` `}
        </Typography>
        <Link
          to="/signup"
          style={{ color: "blue", fontSize: "11px", textDecoration: "none" }}
        >
          Create an account
        </Link>
      </form>
    </Box>
  );
}

export default Login;
