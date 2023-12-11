import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";

export default function TransForm({
  title,
  setIncName,
  setIncAmount,
  setIncStartDate,
  setIncEndDate,
  bindToggle,
  sendIncData
}) {



  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        gap: 1,
      }}
      mt={3}
    >
      <Typography variant="h4" mb={2}>
        {title}
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
          id="name-input"
          label="Name"
          variant="outlined"
          sx={{ width: "100%" }}
          onChange={(e) => setIncName(e.target.value)}
        />
        <FormControl sx={{ width: "100%" }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            onChange={(e) => setIncAmount(e.target.value)}
          />
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              onChange={(newValue) => setIncStartDate(`${newValue.$y}/${newValue.$M+1}`
                )}
              label={"Starting month"} views={["month", "year"]} />
          </DemoContainer>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label={"Select an ending month"}
              views={["month", "year"]}
              onChange={(newValue) => setIncEndDate(`${newValue.$y}/${newValue.$M+1}`
                )}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Box>
          <Button color="inherit" {...bindToggle}>Cancel</Button>
          <Button color="inherit" onClick={sendIncData}>Create</Button>
        </Box>
      </form>
    </Box>
  );
}
