import { connectRouter } from 'connected-react-router'
import { StateFromReducersMapObject } from 'redux'

import { keyNames } from '../../consts'
import { historyProvider } from '../historyProvider'
import { notesReducer } from './notes'
import { sessionReducer } from './session'

export const rootReducer = {
  [keyNames.Router]: connectRouter(historyProvider),
  [keyNames.Notes]: notesReducer,
  [keyNames.Session]: sessionReducer
}

export type ReducerState = StateFromReducersMapObject<typeof rootReducer>
