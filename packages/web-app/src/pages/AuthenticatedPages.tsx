import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { Urls } from '../consts'
import { authenticateThunk } from '../redux/session/session.thunks'
import { NotesComponent } from './notes/NotesComponent'

export const AuthenticatedPages: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticateThunk())
  }, [dispatch])

  return (
    <Switch>
      <Route exact path={Urls.Notes} component={NotesComponent} />
    </Switch>
  )
}
