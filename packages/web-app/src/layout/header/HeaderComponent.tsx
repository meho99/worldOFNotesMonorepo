import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

import { useStyles } from './Header.styles'
import { HeaderMenu } from './HeaderMenu'

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
