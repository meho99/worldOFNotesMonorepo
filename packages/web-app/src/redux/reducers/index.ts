import { connectRouter } from 'connected-react-router'
import { StateFromReducersMapObject } from 'redux'

import { notesReducer } from './notes'
import { sessionReducer } from './session'
import { historyProvider } from '../historyProvider'
import { ReducerNames } from '../../consts'

export const rootReducer = {
  [ReducerNames.Router]: connectRouter(historyProvider),
  [ReducerNames.Session]: sessionReducer,
  [ReducerNames.Notes]: notesReducer
}

export type ReducerState = StateFromReducersMapObject<typeof rootReducer>
