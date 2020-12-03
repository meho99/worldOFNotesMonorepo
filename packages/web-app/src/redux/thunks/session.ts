import { createAsyncThunk } from '@reduxjs/toolkit'
import { push } from 'connected-react-router'

import { Urls } from '../../consts/urls'
import { reducerNames } from '../../consts/reducerNames'
import { sessionActions } from '../reducers/session'

import { authenticateUser } from '../../api/auth'

export const authenticateThunk = createAsyncThunk(
  `${reducerNames.Session}/authenticateByToken`,
  async (_, { dispatch }) => {
    try {
      dispatch(sessionActions.authenticate())
      const token = localStorage.getItem('token') as string
      
      const userData = await authenticateUser(token)
  
      dispatch(sessionActions.authenticationSuccess({
        token,
        userData
      }))
    } catch (e) {
      dispatch(sessionActions.authenticationError())
      dispatch(push(Urls.Login))
    }
  }
)
