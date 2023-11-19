import { ThemeContext, useTheme } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, {useState} from 'react'




function Transactions() {
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant='h4'>Incomes</Typography>
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
        <DataGrid
          getRowId={(row) => row._id}
        />
      </Box>

    </Box>
  )
}

export default Transactions