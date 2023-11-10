import { Box, Button, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'

function Login() {
  return (
    <Box component="form" sx={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:1}} mt={3}>
        <Typography variant='h4' mb={2}>
            Login
        </Typography>
        <form action="" style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:"12px"}}>
        <TextField id="outlined-basic" label="Email" variant="outlined" sx={{width: "50%"}}/>
        <TextField id="outlined-basic" label="Password" variant="outlined" sx={{width: "50%"}}/>
        <Button color='inherit'>Login</Button>
        <Typography variant='p' sx={{fontSize:"11px"}}>
        If you don't have an account yet, register {` `}
        </Typography>
        <Link to="/signup" style={{color:"blue", fontSize: "11px", textDecoration: "none"}}>
        Create an account
        </Link>
        </form>
    </Box>
  )
}

export default Login