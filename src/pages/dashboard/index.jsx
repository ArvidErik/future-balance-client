import {
  Container,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import BalanceChart from "components/BalanceChart";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import data from "../../data/kpi-data.json";
import axios from "axios";
import FlexBetween from "components/FlexBetween";


function Dashboard({ username }) {
  const theme = useTheme();

  const [year, setyear] = useState("all");
  const kpiData = data;
  const [balanceData, setBalanceData] = useState([]);
  // KPIS
  const [currentBalance, setCurrentBalance] = useState(0);
  const [avgIncome, setAvgIncome] = useState(0);
  const [avgExpense, setAvgExpense] = useState(0);

  const now = Date.now();
  const today = new Date(now);

  console.log("CURRENT BALANCE", currentBalance);
  console.log("AVG", avgIncome);
  console.log("EXP", avgExpense);

  useEffect(() => {
    axios
      .get("http://localhost:5001/transactions/balancedata", {
        headers: {
          userId: localStorage.getItem("userid"),
        },
      })
      .then((res) => {
        let obj = {
          id: "balance",
          color: "hsl(0, 70%, 50%)",
          data: res.data,
        };
        if (year != "all") {
          const newArr = [...obj.data].filter((e) => e.x.includes(`${year}`));
          obj = {
            id: "balance",
            color: "hsl(0, 70%, 50%)",
            data: newArr,
          };
          setBalanceData([obj]);
        } else {
          setBalanceData([obj]);
        }
      })
      .then(() => {
        const date = new Date(Date.now());
        const formattedDate = `${(
          date.getMonth() + 1
        ).toString()}-${date.getFullYear()}`;

        const element =
          balanceData &&
          balanceData[0]?.data.find((obj) =>
            Object.values(obj).includes(formattedDate)
          );
        const currentBalance = element.y;
        if (currentBalance) {
          setCurrentBalance(currentBalance);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [year]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/transactions/transactions", {
        headers: {
          userId: localStorage.getItem("userid"),
        },
      })
      .then((res) => {
        let incomes = [];
        if (year != "all") {
          incomes = res.data.filter((obj) => {
            const date = new Date(obj.dueDate);
            return obj.type == "income" && date.getFullYear() == year;
          });
        } else {
          incomes = res.data.filter((obj) => {
            return obj.type == "income";
          });
        }
        return incomes;
      })
      .then((res) => {
        if (res.length != 0) {
          let incomeSum = 0;
          res.forEach((element) => {
            incomeSum += element.amount;
          });
          const incomeAvg = incomeSum / res.length;
          setAvgIncome(incomeAvg);
        } else {
          setAvgIncome(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [year]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/transactions/transactions", {
        headers: {
          userId: localStorage.getItem("userid"),
        },
      })
      .then((res) => {
        let incomes = [];
        if (year != "all") {
          incomes = res.data.filter((obj) => {
            const date = new Date(obj.dueDate);
            return obj.type == "expense" && date.getFullYear() == year;
          });
        } else {
          incomes = res.data.filter((obj) => {
            return obj.type == "expense";
          });
        }
        return incomes;
      })
      .then((res) => {
        if (res.length != 0) {
          let expenseSum = 0;
          res.forEach((element) => {
            expenseSum += element.amount;
          });
          const expenseAvg = expenseSum / res.length;
          setAvgExpense(expenseAvg);
        } else {
          setAvgExpense(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [avgIncome, avgExpense]);

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
        gridAutoRows="120px"
        gap="20px"
      >
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
        >
          <FlexBetween>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.secondary[100] }}
            >
              Current Balance
            </Typography>
          </FlexBetween>

          <Typography
            variant="h3"
            fontWeight="600"
            sx={{
              color: theme.palette.secondary[400],
            }}
          >
            {currentBalance}
          </Typography>
        </Box>
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
        >
          <FlexBetween>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.secondary[100] }}
            >
              Avg. Monthly Income
            </Typography>
          </FlexBetween>

          <Typography
            variant="h3"
            fontWeight="600"
            sx={{
              color: theme.palette.secondary[400],
            }}
          >
            {avgIncome}
          </Typography>
        </Box>
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
        >
          <FlexBetween>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.secondary[100] }}
            >
              Avg. Monthly Expense
            </Typography>
          </FlexBetween>

          <Typography
            variant="h3"
            fontWeight="600"
            sx={{
              color: theme.palette.red[400],
            }}
          >
            {avgExpense}
          </Typography>
        </Box>
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
        >
          <FlexBetween>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.secondary[100] }}
            >
              Saving ratio
            </Typography>
          </FlexBetween>

          <Typography
            variant="h3"
            fontWeight="600"
            sx={{
              color: theme.palette.secondary[400],
            }}
          >
            {avgIncome && Math.floor((avgIncome-avgExpense)*100/avgIncome)}%
          </Typography>
        </Box>
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
          <MenuItem value={today.getFullYear() + 1}>
            {today.getFullYear() + 1}
          </MenuItem>
          <MenuItem value={today.getFullYear() + 2}>
            {today.getFullYear() + 2}
          </MenuItem>
          <MenuItem value={today.getFullYear() + 3}>
            {today.getFullYear() + 3}
          </MenuItem>
          <MenuItem value={today.getFullYear() + 4}>
            {today.getFullYear() + 4}
          </MenuItem>
        </Select>
      </FormControl>
      <Box height="60vh" mt={3}>
        <BalanceChart data={balanceData} year={year} />
      </Box>
    </Container>
  );
}

export default Dashboard;
