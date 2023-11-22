import { Container, Typography, Button, Box } from "@mui/material";
import BalanceChart from "components/BalanceChart";
import React from "react";
import { Link } from "react-router-dom";


function Dashboard({ username }) {
  

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
      <Box></Box>
      <Box height="75vh">
        <BalanceChart/>
      </Box>

    </Container>
  );
}

export default Dashboard;
