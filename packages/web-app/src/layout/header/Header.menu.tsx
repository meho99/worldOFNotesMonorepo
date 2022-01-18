import React from 'react'
import Menu from '@mui/material/Menu'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import FormControlLabel from '@mui/material/FormControlLabel'

import { useStyles } from './Header.styles'
import { useHeaderMenu, useMenuOptions } from './Header.hooks'

export const HeaderMenu = () => {
  const classes = useStyles()

  const {
    anchorEl,
    handleClick,
    handleClose
  } = useHeaderMenu()

  const {
    isDarkTheme,
    handleLogOut,
    isAuthenticated,
    handleChangeThemeVariant
  } = useMenuOptions()

  const onLogout = () => {
    handleLogOut()
    handleClose()
  }

  return (
    <div>
      <IconButton
        edge='start'
        className={classes.menuButton}
        color='inherit' aria-label='menu'
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem >
          <FormControlLabel
            control={
              <Switch
                checked={isDarkTheme}
                onChange={handleChangeThemeVariant}
                name='isDarkTheme'
                color='primary'
              />
            }
            label='Dark'
          />
        </MenuItem>
        {
          isAuthenticated && <MenuItem onClick={onLogout}>Log out</MenuItem>
        }
      </Menu>
    </div>
  )
}
