import { createSlice } from '@reduxjs/toolkit'

console.log(test)

export class State {
  counter: number = 0
}

export const slice = createSlice({
  name: 'root reducer',
  initialState: { ... new State() },
  reducers: {
    increment: state => ({
      ...state,
      counter: state.counter + 1
    })
  }
})

export const actions = slice.actions
