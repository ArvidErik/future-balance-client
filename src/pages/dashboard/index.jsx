import { Container, Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Dashboard({ username }) {

  console.log("username is", username);

  return !username ? (
    <Container
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Typography variant="h4" mt={5}>
        Welcome to your finance calculator
      </Typography>
      <Typography variant="h5" mt={2}>
        Please Log in to see your data
      </Typography>
      <Button color="inherit" sx={{ marginTop: "1rem" }}>
        <Link
          to={"/login"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Login
        </Link>
      </Button>
    </Container>
  ) : (
    <Container>
      <Typography variant="h4" mt={5}>
        Welcome {username}
      </Typography>
    </Container>
  );
}

export default Dashboard;
