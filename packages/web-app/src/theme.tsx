import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createTheme, ThemeOptions, responsiveFontSizes, ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles'
import { ThemeProvider as MuiThemeProvider2 } from '@mui/styles'

import { ThemeTypes } from './consts'
import { themeTypeSelector } from './redux/session/session.selectors'

import '@mui/styles'

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme { }
}

const colors = {
  ashGray: '#CAD2C5',
  darkSeaGreen: '#84A98C',
  hookersGreen: '#52796F',
  darkSlateGreen: '#354F52',
  charcoal: '#2f3e46',
  darkBackground: '#1c1c1c',
  paperBackground: '#141414'
}

const getThemeConfiguration = ({ palette, spacing, breakpoints }: Theme): ThemeOptions => ({
  components: {
    MuiPaper: {
      styleOverrides: {
        elevation4: {
          boxShadow: 'none'
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          justifyContent: 'center'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
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
      }
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          width: '20px',
          height: '20px',
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        action: {
          display: 'flex',
          alignItems: 'center',
          borderLeft: `1px solid ${palette.error.main}`,
          padding: 4,
          paddingLeft: 8,
          marginLeft: spacing(8),
          [breakpoints.down('sm')]: {
            marginLeft: spacing(2),
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        colorSecondary: {
          background: palette.secondary.main
        }
      }
    }
  }
})

const baseConfig: ThemeOptions = {
  typography: {
    fontFamily: '\'Nunito\', sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '4rem !important'
    }
  }
}

const lightTheme = responsiveFontSizes(
  createTheme({
    ...baseConfig,
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
  createTheme({
    ...baseConfig,
    palette: {
      mode: 'dark',
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

  const baseTheme = useMemo(() =>
    themeVariantsMap[themeVariant],
    [themeVariant]
  )

  const theme = useMemo(() =>
    createTheme(baseTheme, getThemeConfiguration(baseTheme)),
    [baseTheme]
  )

  return (
    <MuiThemeProvider theme={theme} {...rest}>
      <MuiThemeProvider2 theme={theme}>
        {children}

      </MuiThemeProvider2>
    </MuiThemeProvider>
  )
}
