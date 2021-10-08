import { createSlice } from '@reduxjs/toolkit'

import { UserModel } from '@won/core'
import { ThemeTypes, ReducerNames, FiniteStates } from '../../consts'
import { authenticateThunk, loginThunk, logOutThunk, signUpThunk } from './session.thunks'

export class SessionState {
  token: string | null = localStorage.getItem('token');
  authenticatingStatus: FiniteStates = FiniteStates.Idle;
  loginStatus: FiniteStates = FiniteStates.Idle;
  signUpStatus: FiniteStates = FiniteStates.Idle;
  user: Partial<UserModel> = {};
  theme: ThemeTypes = localStorage.getItem('themeVariant') as ThemeTypes || ThemeTypes.Dark;
}

const initialState = { ...new SessionState() }

const sessionSlice = createSlice({
  name: ReducerNames.Session,
  initialState,
  reducers: {
    changeThemeType: (state) => {
      const newThemeVariant = state.theme === ThemeTypes.Light
        ? ThemeTypes.Dark
        : ThemeTypes.Light

      localStorage.setItem('themeVariant', newThemeVariant)
      state.theme = newThemeVariant
    }
  },
  extraReducers: builder => {
    // -- LOGIN --

    builder.addCase(loginThunk.pending, state => {
      state.loginStatus = FiniteStates.Loading
    })

    builder.addCase(loginThunk.rejected, state => {
      state.loginStatus = FiniteStates.Failure
    })

    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      const { token } = payload

      localStorage.setItem('token', token)
      state.token = token
      state.loginStatus = FiniteStates.Success
    })

    // -- SIGNUP --

    builder.addCase(signUpThunk.pending, state => {
      state.signUpStatus = FiniteStates.Loading
    })

    builder.addCase(signUpThunk.rejected, state => {
      state.signUpStatus = FiniteStates.Failure
    })

    builder.addCase(signUpThunk.fulfilled, (state, { payload }) => {
      const { token } = payload

      localStorage.setItem('token', token)
      state.token = token
      state.signUpStatus = FiniteStates.Success
    })

    // -- AUTHENTICATE --

    builder.addCase(authenticateThunk.pending, state => {
      state.authenticatingStatus = FiniteStates.Loading
    })

    builder.addCase(authenticateThunk.rejected, state => {
      state.authenticatingStatus = FiniteStates.Failure
    })

    builder.addCase(authenticateThunk.fulfilled, (state, { payload }) => {
      const { token, userData } = payload

      state.user = userData
      state.token = token
      state.authenticatingStatus = FiniteStates.Success
    })

    // -- LOGOUT --

    builder.addCase(logOutThunk.fulfilled, state => {
      state.token = null
      state.signUpStatus = FiniteStates.Idle
      state.loginStatus = FiniteStates.Idle
      state.authenticatingStatus = FiniteStates.Idle
      state.user = {}
    })
  }
})

export const sessionActions = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer
