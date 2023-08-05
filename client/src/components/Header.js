import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function Dashboard () {
  return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <MuiAppBar position="absolute">
            <Toolbar
              sx={{
                pr: '24px' // keep right padding when drawer closed
              }}
            >

              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
                {/* TODO: add links to pages */}
            </Toolbar>
          </MuiAppBar>
        </Box>
  )
}
