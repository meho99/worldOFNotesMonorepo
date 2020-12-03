import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserModel } from '@won/core'
import { reducerNames } from '../../consts/reducerNames'

export class SessionState {
  token?: string = undefined;
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  user: Partial<UserModel> = {};
}

const sessionSlice = createSlice({
  name: reducerNames.Session,
  initialState: { ...new SessionState() },
  reducers: {
    setIsAuthenticated: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthenticated = payload
    },
    authenticate: (state) => {
      state.isAuthenticated = false
      state.isLoading = true
    },
    authenticationSuccess: (state, { payload }: PayloadAction< { token: string; userData: UserModel }>) => {
      const { token, userData} = payload

      state.user = userData
      state.token = token
      state.isLoading = false
      state.isAuthenticated = true
    },
    authenticationError: (state) => {
      state.isLoading = false
    }
  }
})

export const sessionActions = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer
