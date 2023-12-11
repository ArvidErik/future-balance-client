import { ThemeContext, useTheme } from "@emotion/react";
import { Box, Typography, Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import FlexBetween from "components/FlexBetween";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import TransForm from "components/TransForm";

const columns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
  },
  {
    field: "from",
    headerName: "From",
    flex: 1,
  },
  {
    field: "to",
    headerName: "To",
    flex: 1,
  }
];

function Transactions({ username }) {
  const theme = useTheme();

  const [data, setData] = useState("");

  const [incName, setIncName] = useState("");
  const [incAmount, setIncAmount] = useState("");
  const [incStartDate, setIncStartDate] = useState("");
  const [incEndDate, setIncEndDate] = useState("");
  const [newTransaction, setNewTransaction] = useState(false)

  console.log("INCNAME", incName);
  console.log("INCAMOUNT", incAmount);
  console.log("INCStart", incStartDate);
  console.log("INCEnd", incEndDate);

  useEffect(() => {
    axios
      .get("http://localhost:5001/transactions/transactionfamilies", {
        headers: {
          userId: localStorage.getItem("userid"),
        },
      })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newTransaction]);

  console.log("DATA", data.data);

  function sendIncData() {
    if (
      incName != null &&
      incAmount != null &&
      incStartDate != null &&
      incEndDate != null
    ) {
      axios
        .post("http://localhost:5001/transactions/create", {
          name: incName,
          amount: incAmount,
          from: incStartDate,
          to: incEndDate,
          type: "income",
          ownerId: localStorage.getItem("userid"),
        })
        .then(() => {
          console.log("SUCCESS");
          setNewTransaction(!newTransaction)
          setIncAmount(null)
          setIncName(null)
          setIncEndDate(null)
          setIncStartDate(null)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function showDelete(){

  }

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
    <Box
      m="1.5rem 2.5rem"
      display="grid"
      gridTemplateColumns="repeat(2, 1fr)"
      gridAutoRows="160px"
      gap="20px"
    >
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" mb={2}>
            Incomes
          </Typography>
          <PopupState variant="popper" popupId="demo-popup-popper">
            {(popupState) => (
              <div>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{
                    backgroundColor: theme.palette.secondary[600],
                    fontSize: "20px",
                    padding: 0,
                    height: "2rem",
                  }}
                  {...bindToggle(popupState)}
                >
                  +
                </Button>
                <Popper {...bindPopper(popupState)} transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper>
                        <TransForm
                          title={"Add a New Income"}
                          setIncName={setIncName}
                          setIncAmount={setIncAmount}
                          setIncStartDate={setIncStartDate}
                          setIncEndDate={setIncEndDate}
                          sendIncData={sendIncData}
                          bindToggle={{ ...bindToggle(popupState) }}
                        />
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </div>
            )}
          </PopupState>
        </Box>
        <DataGrid
          getRowId={(row) => row._id}
          rows={
            (data && data.data.filter((data) => data.type == "income")) || []
          }
          columns={columns}
        />     
      </Box>
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" mb={2}>
            Expenses
          </Typography>
          <PopupState variant="popper" popupId="demo-popup-popper">
            {(popupState) => (
              <div>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{
                    backgroundColor: theme.palette.red[600],
                    fontSize: "20px",
                    padding: 0,
                    height: "2rem",
                  }}
                  {...bindToggle(popupState)}
                >
                  -
                </Button>
                <Popper {...bindPopper(popupState)} transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper>
                        <TransForm title={"Add a New Expense"} />
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </div>
            )}
          </PopupState>
        </Box>
        <DataGrid
          getRowId={(row) => row._id}
          rows={
            (data && data.data.filter((data) => data.type == "expense")) || []
          }
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default Transactions;
