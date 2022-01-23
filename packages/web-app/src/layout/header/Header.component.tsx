import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { useStyles } from './Header.styles'
import { HeaderMenu } from './Header.menu'

export const HeaderComponent = () => {
  const classes = useStyles()

  return (
    <AppBar position='fixed' color='secondary'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          World of Notes
        </Typography>

        <HeaderMenu />
      </Toolbar>
    </AppBar>
  )
}
