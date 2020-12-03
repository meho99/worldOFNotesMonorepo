import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'

import { rootReducer } from './reducers'
import { historyProvider } from './historyProvider'

export const store = configureStore({
  reducer: combineReducers(rootReducer),
  middleware: [
    thunkMiddleware,
    routerMiddleware(historyProvider)
  ]
})
