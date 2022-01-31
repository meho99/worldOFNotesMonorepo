import React from 'react'
import { Route, Switch } from 'react-router-dom'

import CircularProgress from '@mui/material/CircularProgress'

import { FiniteStates, Urls } from '../consts'
import { NotesComponent } from './notes/Notes.component'
import { useAuthenticate } from './AuthenticatedPages.hooks'
import { useAuthenticatedPagesStyles } from './AuthenticatedPages.styles'

export const AuthenticatedPages: React.FC = () => {
  const classes = useAuthenticatedPagesStyles()
  const authenticatingStatus = useAuthenticate()
  console.log({ authenticatingStatus })

  if (authenticatingStatus !== FiniteStates.Success) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress
          size={30}
          thickness={6}
          color='primary'
        />
      </div>
    )
  }

  return (
    <Switch>
      <Route exact path={Urls.Notes} component={NotesComponent} />
    </Switch>
  )
}
