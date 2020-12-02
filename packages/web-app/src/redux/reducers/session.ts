import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { reducerNames } from '../../consts/reducerNames'

export class SessionState {
  userId: number = 0;
  isAuthenticated: boolean = false
}

const sessionSlice = createSlice({
  name: reducerNames.Session,
  initialState: { ...new SessionState() },
  reducers: {
    setUserId: (state, { payload }: PayloadAction<number>) => {
      state.userId = payload
    },
    setIsAuthenticated: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthenticated = payload
    }
  }
})

export const sessionActions = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer
