import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'

import { historyProvider } from './historyProvider'
import { rootReducer } from './rootReducer'

export const store = configureStore({
  reducer: combineReducers(rootReducer),
  middleware: [
    thunkMiddleware,
    routerMiddleware(historyProvider)
  ]
})
