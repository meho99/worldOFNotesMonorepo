import { createAsyncThunk } from '@reduxjs/toolkit'
import { push } from 'connected-react-router'

import { LoginRequest, SignUpRequest } from '@won/core'
import { Urls, FetchingErrors } from '../../consts'
import { ReducerNames } from '../../consts'
import { authenticateUser } from '../../api/auth'
import { loginUser } from '../../api/login'
import { signUpUser } from '../../api/signUp'
import { sessionActions } from './session.reducer'
import { notificationsActions } from '../notifications/notifications.reducer'
import { errorThunk } from '../notifications/notifications.helpers'

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
      dispatch(push(Urls.Login))
      dispatch(sessionActions.authenticateError())
      dispatch(notificationsActions.addErrorNotification('Unauthorized'))
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
      errorThunk({e, dispatch, defaultMessage: FetchingErrors.LoginError })
    }
  }
)

export const signUpThunk = createAsyncThunk<void, SignUpRequest>(
  `${ReducerNames.Session}/signUpUser`,
  async (signUpData, { dispatch }) => {
    try {
      dispatch(sessionActions.signUp())

      const signUpResponse = await signUpUser(signUpData)
      dispatch(sessionActions.signUpSuccess({
        token: signUpResponse.token
      }))

      dispatch(push(Urls.Notes))
    } catch (e) {
      dispatch(sessionActions.signUpError())
      errorThunk({e, dispatch, defaultMessage: FetchingErrors.SingUpError })
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
