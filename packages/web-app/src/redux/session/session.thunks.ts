import { createAsyncThunk } from '@reduxjs/toolkit'
import { push } from 'connected-react-router'

import { LoginRequest } from '@won/core'
import { Urls } from '../../consts'
import { ReducerNames } from '../../consts'
import { authenticateUser } from '../../api/auth'
import { loginUser } from '../../api/login'
import { signUpUser } from '../../api/signUp'
import { sessionActions } from './session.reducer'

export const authenticateThunk = createAsyncThunk(
  `${ReducerNames.Session}/authenticateByToken`,
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
  `${ReducerNames.Session}/loginUser`,
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

export const signUpThunk = createAsyncThunk<void, LoginRequest>(
  `${ReducerNames.Session}/signUpUser`,
  async (signUpData, { dispatch }) => {
    try {
      dispatch(sessionActions.signUp())

      const loginResponse = await signUpUser(signUpData)

      dispatch(sessionActions.signUpSuccess({
        token: loginResponse.token
      }))

      dispatch(push(Urls.Notes))
    } catch (e) {
      dispatch(sessionActions.signUpError())
    }
  }
)

export const logOutThunk = createAsyncThunk<void>(
  `${ReducerNames.Session}/logOutUser`,
  (_, { dispatch }) => {
    localStorage.removeItem('token')

    dispatch(sessionActions.logOut())
    dispatch(push(Urls.Login))
  }
)
