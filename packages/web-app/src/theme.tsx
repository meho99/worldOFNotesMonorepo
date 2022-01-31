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
  paperBackground: '#141414',
  red: '#f44336',
  darkRed: '#580a05'
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
          borderLeftWidth: 2,
          borderLeftStyle: 'solid',
          padding: 1,
          paddingLeft: 8,
          marginLeft: spacing(10),
          [breakpoints.down('sm')]: {
            marginLeft: spacing(2),
          },
          '& button': {
            margin: '0px 3px',
            color: 'initial',
            width: 18,
            height: 18,
            '& svg': {
              width: 18,
              color: 'white'
            }
          }
        },
        root: {
          display: 'flex',
          alignItems: 'center',
        },
        standardSuccess: {
          borderLeft: `2px solid ${palette.success.main}`,
          '.MuiAlert-action': {
            borderLeftColor: palette.success.main,
            '& button': {
              backgroundColor: palette.success.main,
              '&:hover': {
                backgroundColor: palette.success.dark
              },
            }
          }
        },
        standardError: {
          borderLeft: `2px solid ${palette.error.main}`,
          '.MuiAlert-action': {
            borderLeftColor: palette.error.main,
            '& button': {
              backgroundColor: palette.error.main,
              '&:hover': {
                backgroundColor: palette.error.dark
              },
            }
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
      error: {
        main: colors.red,
        dark: colors.darkRed
      }
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
      },
      error: {
        main: colors.red,
        dark: colors.darkRed
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
