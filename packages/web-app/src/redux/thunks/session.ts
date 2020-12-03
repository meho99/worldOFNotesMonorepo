import { createAsyncThunk } from '@reduxjs/toolkit'
import { push } from 'connected-react-router'

import { LoginRequest } from '@won/core'
import { Urls } from '../../consts/urls'
import { reducerNames } from '../../consts/reducerNames'
import { sessionActions } from '../reducers/session'

import { authenticateUser } from '../../api/auth'
import { loginUser } from '../../api/login'

export const authenticateThunk = createAsyncThunk(
  `${reducerNames.Session}/authenticateByToken`,
  async (_, { dispatch }) => {
    try {
      dispatch(sessionActions.authenticate())
      const token = localStorage.getItem('token') as string
      
      const userData = await authenticateUser(token)
  
      dispatch(sessionActions.authenticateSuccess({
        token,
        userData
      }))
    } catch (e) {
      dispatch(sessionActions.authenticateError())
      dispatch(push(Urls.Login))
    }
  }
)

export const loginThunk = createAsyncThunk<void, LoginRequest>(
  `${reducerNames.Session}/loginUser`,
  async (loginData, { dispatch }) => {
    try {
      dispatch(sessionActions.login())

      const loginResponse = await loginUser(loginData)

      dispatch(sessionActions.loginSuccess({
        token: loginResponse.token
      }))

      dispatch(push(Urls.Notes))
    } catch (e) {
      dispatch(sessionActions.loginError())
    }
  }
)
