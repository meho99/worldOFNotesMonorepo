import React from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

export const CenteredContainer: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ({ palette }) => palette.background.default,
      }}
    >
      <Box
        sx={({ shadows, palette, spacing }) => ({
          top: '50%',
          display: 'flex',
          position: 'absolute',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          transform: 'translate(0, -50%)',
          borderRadius: spacing(1),
          backgroundColor: palette.background.paper,
          p: { xs: spacing(4, 0), md: spacing(6, 10) },
          width: { xs: '100%', md: 'fit-content' },
          boxShadow: { xs: 'none', md: shadows[3] },
        })}
      >
        {children}
      </Box>
    </Box>
  )
}

export const CenteredFormContainer = styled('form')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  maxWidth: 450,
}))
