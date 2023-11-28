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
    const [currentBalance, setCurrentBalance] = useState("")

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
      let obj = {
        id: "balance",
        color: "hsl(0, 70%, 50%)",
        data: res.data
      }
      if (year != "all") {
        const newArr = [...obj.data].filter(e => e.x.includes(`${year}`))

        console.log("NEWARR", newArr);
        obj = {
          id: "balance",
          color: "hsl(0, 70%, 50%)",
          data: newArr
        }
        console.log("FILTERED OBJ", obj);
        setBalanceData([obj])
      } else {
        setBalanceData([obj])
      }
    }).then(()=>{
      const date = new Date(Date.now())
      const formattedDate = `${(
        date.getMonth() + 1
      ).toString()}-${date.getFullYear()}`
  
      const element = balanceData && balanceData[0]?.data.find((obj) =>
      Object.values(obj).includes(formattedDate))
      const currentBalance = element.y
      setCurrentBalance(currentBalance)
  
      console.log("CurrentBalance", currentBalance);
    })
    .catch((err)=>{
      console.log(err);
    })
    }, [year])

    




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
