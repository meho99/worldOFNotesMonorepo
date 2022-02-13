import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { FiniteStates, Urls } from '../consts'
import { NotesComponent } from './notes/Notes.component'
import { useAuthenticate } from './AuthenticatedPages.hooks'

export const AuthenticatedPages: React.FC = () => {
  const authenticatingStatus = useAuthenticate()

  if (authenticatingStatus !== FiniteStates.Success) {
    return (
      <Box
        sx={{
          height: '90vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={30} thickness={6} color='primary' />
      </Box>
    )
  }

  return (
    <Switch>
      <Route exact path={Urls.Notes} component={NotesComponent} />
    </Switch>
  )
}
