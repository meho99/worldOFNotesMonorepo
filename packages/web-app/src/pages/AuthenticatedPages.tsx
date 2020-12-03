import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { Urls } from '../consts/urls'
import { authenticateThunk } from '../redux/thunks/session'
import { NotesComponent } from './notes/NotesComponent'

export const AuthenticatedPages: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticateThunk())
  }, [])

  return (
    <Switch>
      <Route exact path={Urls.Notes} component={NotesComponent} />
    </Switch>
  )
}
