import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export class SessionState {
  userId: number = 0
}

const sessionSlice = createSlice({
  name: 'session reducer',
  initialState: { ...new SessionState() },
  reducers: {
    setUserId: (state, { payload }: PayloadAction<number>) => {
      state.userId = payload
    }
  }
})

export const sessionActions = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer