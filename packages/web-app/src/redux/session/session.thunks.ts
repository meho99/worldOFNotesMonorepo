import { createAsyncThunk } from '@reduxjs/toolkit'
import { push } from 'connected-react-router'

import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SingUpResponse,
  UserModel,
} from '@won/core'
import { Urls, FetchingErrors } from '../../consts'
import { ReducerNames } from '../../consts'
import { authenticateUser } from '../../api/auth'
import { loginUser } from '../../api/login'
import { signUpUser } from '../../api/signUp'
import { notificationsActions } from '../notifications/notifications.reducer'
import { errorThunk } from '../notifications/notifications.helpers'

export const authenticateThunk = createAsyncThunk<{
  token: string
  userData: UserModel
}>(`${ReducerNames.Session}/authenticateByToken`, async (_, { dispatch }) => {
  try {
    const token = localStorage.getItem('token') as string
    const userData = await authenticateUser()

    return { token, userData }
  } catch (e) {
    dispatch(push(Urls.Login))
    dispatch(notificationsActions.addErrorNotification('Unauthorized'))
    throw e
  }
})

export const loginThunk = createAsyncThunk<LoginResponse, LoginRequest>(
  `${ReducerNames.Session}/loginUser`,
  async (loginData, { dispatch }) => {
    try {
      const loginResponse = await loginUser(loginData)
      dispatch(push(Urls.Notes))

      return loginResponse
    } catch (e) {
      errorThunk({ e, dispatch, defaultMessage: FetchingErrors.LoginError })
      throw e
    }
  },
)

export const signUpThunk = createAsyncThunk<SingUpResponse, SignUpRequest>(
  `${ReducerNames.Session}/signUpUser`,
  async (signUpData, { dispatch }) => {
    try {
      const signUpResponse = await signUpUser(signUpData)
      dispatch(push(Urls.Notes))

      return signUpResponse
    } catch (e) {
      errorThunk({ e, dispatch, defaultMessage: FetchingErrors.SingUpError })
      throw e
    }
  },
)

export const logOutThunk = createAsyncThunk<void>(
  `${ReducerNames.Session}/logOutUser`,
  (_, { dispatch }) => {
    localStorage.removeItem('token')

    dispatch(push(Urls.Login))
  },
)
