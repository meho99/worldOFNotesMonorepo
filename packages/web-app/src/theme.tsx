import React from 'react'

import { blue, green, red, yellow } from '@material-ui/core/colors'
import { createMuiTheme, MuiThemeProvider, ThemeOptions, responsiveFontSizes } from '@material-ui/core'

const themeConfiguration: ThemeOptions = {
  typography: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: 16
  },
  overrides: {
    MuiPaper: {
      elevation4: {
        boxShadow: 'none'
      }
    }
  }
}

const lightTheme = responsiveFontSizes(
  createMuiTheme({
    ...themeConfiguration,
    palette: {
      primary: {
        main: yellow[100]
      },
      secondary: {
        main: green[50]
      }
    }
  })
)

const darkTheme = responsiveFontSizes(
  createMuiTheme({
    ...themeConfiguration,
    palette: {
      type: 'dark',
      primary: {
        main: red[100]
      },
      secondary: {
        main: blue[100]
      }
    }
  })
)

type ThemeVariants = 'light' | 'dark'

type ThemeProviderProps =
  Record<string, any> & {
    variant: ThemeVariants;
  }

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ variant = 'light', children, ...rest }) => {
  const theme = variant === 'light'
    ? lightTheme
    : darkTheme

  return (
    <MuiThemeProvider theme={theme} {...rest}>
      {children}
    </MuiThemeProvider>
  )
}
