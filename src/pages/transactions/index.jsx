import { ThemeContext, useTheme } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import FlexBetween from 'components/FlexBetween'
import React, {useEffect, useState} from 'react'


const columns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1
  },
  {
    field: "from",
    headerName: "From",
    flex: 1
  },
  {
    field: "to",
    headerName: "To",
    flex: 1
  }
]


function Transactions() {
  const theme = useTheme();
  
  const [data, setData] = useState("")

  useEffect(()=> {
    axios.get("http://localhost:5001/transactions/get", {
      headers:{
        userId: localStorage.getItem("userid")
      }
      }
    )
    .then((res)=>{
      setData(res)
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])

  console.log(data.data);
  
  return (
    <Box m="1.5rem 2.5rem" 
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gridAutoRows="160px"
        gap="20px"
    >
      <Box height="80vh"
      sx={{
        "& .MuiDataGrid-root":{
          border: "none"
        },
        "& .MuiDataGrid-cell":{
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
          color: `${theme.palette.secondary[200]} !important`
        }
        
      }}
      >
      <Typography variant='h4' mb={2}>Incomes</Typography>
        <DataGrid
          getRowId={(row) => row._id}
          rows={(data && data.data) || []}
          columns={columns}
        />
      </Box>
      <Box height="80vh"
      sx={{
        "& .MuiDataGrid-root":{
          border: "none"
        },
        "& .MuiDataGrid-cell":{
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
          color: `${theme.palette.secondary[200]} !important`
        }
        
      }}
      >
      <Typography variant='h4' mb={2}>Expenses</Typography>
        <DataGrid
          getRowId={(row) => row._id}
          rows={(data && data.data) || []}
          columns={columns}
        />
      </Box>

    </Box>
  )
}

export default Transactions