import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export class SessionState {
  userId: number = 0;
  isAuthenticated: boolean = false
}

const sessionSlice = createSlice({
  name: 'session-reducer',
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
