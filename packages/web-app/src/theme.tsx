import React from 'react'
import { useSelector } from 'react-redux'
import { createMuiTheme, MuiThemeProvider, ThemeOptions, responsiveFontSizes } from '@material-ui/core/styles'

import { ThemeTypes } from './consts'
import { themeTypeSelector } from './redux/session/session.selectors'

const colors = {
  ashGray: '#CAD2C5',
  darkSeaGreen: '#84A98C',
  hookersGreen: '#52796F',
  darkSlateGreen: '#354F52',
  charcoal: '#2f3e46',
  darkBackground: '#1c1c1c',
  paperBackground: '#141414'
}

const themeConfiguration: ThemeOptions = {
  typography: {
    fontFamily: '\'Nunito\', sans-serif',
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
        borderRadius: '16px',
        padding: '16px'
      },
      root: {
        borderRadius: '16px'
      },
      notchedOutline: {
        borderRadius: '16px'
      }
    },
    MuiTypography: {
      h1: {
        fontSize: '4rem !important'
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
        main: colors.darkSeaGreen
      },
      background: {
        default: 'white',
        paper: 'white'
      },
    }
  })
)

const darkTheme = responsiveFontSizes(
  createMuiTheme({
    ...themeConfiguration,
    palette: {
      type: 'dark',
      primary: {
        main: colors.darkSeaGreen
      },
      secondary: {
        main: colors.paperBackground
      },
      background: {
        default: colors.darkBackground,
        paper: colors.paperBackground
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
