import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { HeaderMenu } from './Header.menu'

export const HeaderComponent = () => {
  return (
    <AppBar position='sticky' color='secondary'>
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          World of Notes
        </Typography>

        <HeaderMenu />
      </Toolbar>
    </AppBar>
  )
}
