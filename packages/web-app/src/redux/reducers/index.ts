import { connectRouter } from 'connected-react-router'
import { StateFromReducersMapObject } from 'redux'

import { notesReducer } from './notes'
import { sessionReducer } from './session'
import { historyProvider } from '../historyProvider'
import { reducerNames } from '../../consts/reducerNames'

export const rootReducer = {
  [reducerNames.Router]: connectRouter(historyProvider),
  [reducerNames.Notes]: notesReducer,
  [reducerNames.Session]: sessionReducer
}

export type ReducerState = StateFromReducersMapObject<typeof rootReducer>
