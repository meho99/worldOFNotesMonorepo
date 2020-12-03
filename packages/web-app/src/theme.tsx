import React from 'react'
import { useSelector } from 'react-redux'
import { createMuiTheme, MuiThemeProvider, ThemeOptions, responsiveFontSizes } from '@material-ui/core/styles'

import { themeTypeSelector } from './redux/selectors/session'
import { ThemeTypes } from './consts'

const colors = {
  ashGray: '#CAD2C5',
  darkSeaGreen: '#84A98C',
  hookersGreen: '#52796F',
  darkSlateGreen: '#354F52',
  charcoal: '#2F3E46',
  darkBackground: '#424242'
}

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
    },
    MuiListItem: {
      root: {
        justifyContent: 'center'
      }
    },
    MuiOutlinedInput: {
      input: {
        color: "black",
        borderRadius: "30px",
        backgroundColor: "red",
        borderColor: "red"
      },
      root: {
        border: "red",
        borderRadius: "30px",
      },
      notchedOutline: {
        borderRadius: "30px",
      }
    }
  }
}

const lightTheme = responsiveFontSizes(
  createMuiTheme({
    ...themeConfiguration,
    palette: {
      primary: {
        main: colors.darkSeaGreen
      },
      secondary: {
        main: colors.hookersGreen
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
        main: colors.charcoal
      },
      secondary: {
        main: colors.hookersGreen
      }
    }
  })
)

type ThemeProviderProps = Record<string, any>

const themeVariantsMap = {
  [ThemeTypes.Light]: lightTheme,
  [ThemeTypes.Dark]: darkTheme
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, ...rest }) => {
  const themeVariant = useSelector(themeTypeSelector)

  const theme = themeVariantsMap[themeVariant]

  return (
    <MuiThemeProvider theme={theme} {...rest}>
      {children}
    </MuiThemeProvider>
  )
}
