import { Box, Button, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'

function Signup() {
  return (
    <Box component="form" sx={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:1}} mt={3}>
        <Typography variant='h4' mb={2}>
            Signup
        </Typography>
        <form action="" style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:"12px"}}>
        <TextField required id="name-input" label="Name" variant="outlined" 
         sx={{width: "50%"}}/>
        <TextField required id="email-input" label="Email" variant="outlined" sx={{width: "50%"}}/>
        <TextField required id="password-input" label="Password" variant="outlined" sx={{width: "50%"}}/>
        <TextField required id="confirm-input" label="Confirm Password" variant="outlined" sx={{width: "50%"}}/>
        <Button color='inherit'>Signup</Button>
        <Typography variant='p' sx={{fontSize:"11px"}}>
        If you don't have an account yet, register below {` `}
        </Typography>
        <Link to="/login" style={{color:"blue", fontSize: "11px", textDecoration: "none"}}>
        I already have an account
        </Link>
        </form>
    </Box>
  )
}

export default Signup