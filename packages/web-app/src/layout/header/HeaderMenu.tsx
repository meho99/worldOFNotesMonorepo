import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

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
    isAuthenticated,
    handleChangeThemeVariant
  } = useMenuOptions()

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
          isAuthenticated && <MenuItem onClick={handleClose}>Log out</MenuItem>
        }
      </Menu>
    </div>
  )
}
