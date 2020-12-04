import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserModel } from '@won/core'
import { ThemeTypes, ReducerNames, FiniteStates } from '../../consts'

export class SessionState {
  token: string | null = localStorage.getItem('token');
  authenticatingStatus: FiniteStates = FiniteStates.Idle;
  loginStatus: FiniteStates = FiniteStates.Idle;
  user: Partial<UserModel> = {};
  theme: ThemeTypes = localStorage.getItem('themeVariant') as ThemeTypes || ThemeTypes.Dark;
}

const initialState = { ...new SessionState() }

const sessionSlice = createSlice({
  name: ReducerNames.Session,
  initialState,
  reducers: {
    authenticate: (state) => {
      state.authenticatingStatus = FiniteStates.Loading
    },
    authenticateError: (state) => {
      localStorage.removeItem('token')

      state.authenticatingStatus = FiniteStates.Failure
      state.token = initialState.token
      state.user = initialState.user
    },
    authenticateSuccess: (state, { payload }: PayloadAction<{ token: string; userData: UserModel }>) => {
      const { token, userData } = payload

      state.user = userData
      state.token = token
      state.authenticatingStatus = FiniteStates.Success
    },
    login: (state) => {
      state.loginStatus = FiniteStates.Loading
    },
    loginError: (state) => {
      state.loginStatus = FiniteStates.Failure
    },
    loginSuccess: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
      localStorage.setItem('token', token)

      state.token = token
      state.loginStatus = FiniteStates.Success
    },
    changeThemeType: (state) => {
      const newThemeVariant = state.theme === ThemeTypes.Light
        ? ThemeTypes.Dark
        : ThemeTypes.Light

      localStorage.setItem('themeVariant', newThemeVariant)
      state.theme = newThemeVariant
    }
  }
})

export const sessionActions = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer
