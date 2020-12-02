import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import { rootReducer } from './reducers'

export const store = configureStore({
  reducer: combineReducers(rootReducer),
  middleware: [
    thunkMiddleware
  ]
})
