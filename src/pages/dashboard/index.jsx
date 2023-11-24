import { Container, Typography, Button, Box, FormControl, InputLabel, Input, Select, MenuItem } from "@mui/material";
import BalanceChart from "components/BalanceChart";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import data from "../../data/kpi-data.json";
import StatBox from "components/StatBox";

function Dashboard({ username }) {

    const  [view, setView] = useState("units")
    const kpiData = data;

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
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridAutoRows="160px"
        gap="20px"
      >
        {kpiData.map((element) => {
          return <StatBox {...element} />;
        })}
      </Box>
      <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
      </FormControl>
      <Box height="60vh" mt={3}>
        <BalanceChart />
      </Box>
    </Container>
  );
}

export default Dashboard;
