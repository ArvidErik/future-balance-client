import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { create } from "@mui/material/styles/createTransitions";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate()

  const createUser = async () => {
    if (name == "" || email == "" || password == "" || password2 == "") {
      setMessage("Please fill in all the required fields");
      setTimeout(() => {
        setMessage("");
      }, 10000);
    }

    if (password === password2) {
      const newUser = { "name": name, "email": email, "password": password };

      try {
        const response = await axios.post(`http://localhost:5001/users/signup`, {
          newUser
        });
        console.log(response);
        navigate("/login")

      } catch (error) {
        console.log(error);
      }
    } else {
      setMessage("The two password should match!");
      setTimeout(() => {
        setMessage("");
      }, 10000);
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
        Signup
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
          required
          id="name-input"
          label="Name"
          variant="outlined"
          sx={{ width: "50%" }}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="email-input"
          label="Email"
          variant="outlined"
          sx={{ width: "50%" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id="password-input"
          label="Password"
          variant="outlined"
          sx={{ width: "50%" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          required
          id="confirm-input"
          label="Confirm Password"
          variant="outlined"
          sx={{ width: "50%" }}
          onChange={(e) => setpassword2(e.target.value)}
        />
        {message && (
          <Box
            sx={{
              backgroundColor: "rgba(255,68,90,.2)",
              width: "50%",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {message}
          </Box>
        )}
        <Button color="inherit" onClick={createUser}>
          Signup
        </Button>
        <Typography variant="p" sx={{ fontSize: "11px" }}>
          If you don't have an account yet, register below {` `}
        </Typography>
        <Link
          to="/login"
          style={{ color: "blue", fontSize: "11px", textDecoration: "none" }}
        >
          I already have an account
        </Link>
      </form>
    </Box>
  );
}

export default Signup;
