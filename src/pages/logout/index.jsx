import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


function Logout({setUsername}) {

    const navigate = useNavigate()

    const doLogout = () => {
        localStorage.clear()
        setUsername("")
        navigate("/login")
    }


  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h5" mt={5} mb={2}>Are you sure you want to log out?</Typography>
      <Box sx={{display: "flex", gap: "5px"}}>
        <Button color="inherit" onClick={doLogout}>Yes</Button>
        <Button color="inherit" onClick={()=>{navigate("/dashboard")}}>No</Button>
      </Box>
    </Box>
  );
}

export default Logout;
