import { Container, Typography, Button, Box, FormControl, InputLabel, Input, Select, MenuItem } from "@mui/material";
import BalanceChart from "components/BalanceChart";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import data from "../../data/kpi-data.json";
import StatBox from "components/StatBox";
import axios from "axios";

function Dashboard({ username }) {

    const  [year, setyear] = useState("all")
    const kpiData = data;
    const [balanceData, setBalanceData] = useState([])

    const now = Date.now()
    const today = new Date(now)
    
    useEffect(()=>{
      
      axios.get("http://localhost:5001/transactions/balancedata", {
      headers:{
        userId: localStorage.getItem("userid")
      }
      }
    )
    .then((res)=>{
      const obj = {
        id: "balance",
        color: "hsl(0, 70%, 50%)",
        data: res.data
      }
      if (year !== "all") {
        setBalanceData([...obj].filter(e => e.data.x.substring(e.data.x.length-4)=={year}))
      } else {
        setBalanceData([obj])
      }
    })
    .catch((err)=>{
      console.log(err);
    })

    }, [year])

    console.log("BALANCE",  balanceData);

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
            value={year}
            label="Year"
            onChange={(e) => setyear(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value={today.getFullYear()}>{today.getFullYear()}</MenuItem>
            <MenuItem value={today.getFullYear()+1}>{today.getFullYear()+1}</MenuItem>
            <MenuItem value={today.getFullYear()+2}>{today.getFullYear()+2}</MenuItem>
            <MenuItem value={today.getFullYear()+3}>{today.getFullYear()+3}</MenuItem>
            <MenuItem value={today.getFullYear()+4}>{today.getFullYear()+4}</MenuItem>
          </Select>
      </FormControl>
      <Box height="60vh" mt={3}>
        <BalanceChart data={balanceData} year={year}/>
      </Box>
    </Container>
  );
}

export default Dashboard;
