import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sessionActions } from '../../redux/session/session.reducer'
import {
  isAuthenticatedSelector,
  isDarkThemeSelector,
} from '../../redux/session/session.selectors'
import { logOutThunk } from '../../redux/session/session.thunks'

export const useHeaderMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return {
    anchorEl,
    handleClick,
    handleClose,
  }
}

export const useMenuOptions = () => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector(isAuthenticatedSelector)
  const isDarkTheme = useSelector(isDarkThemeSelector)
  const handleLogOut = () => {
    dispatch(logOutThunk())
  }

  const handleChangeThemeVariant = () => {
    dispatch(sessionActions.changeThemeType())
  }

  return {
    isDarkTheme,
    handleLogOut,
    isAuthenticated,
    handleChangeThemeVariant,
  }
}
