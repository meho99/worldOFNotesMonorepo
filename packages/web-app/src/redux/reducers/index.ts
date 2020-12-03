import { connectRouter } from 'connected-react-router'
import { StateFromReducersMapObject } from 'redux'

import { notesReducer } from './notes'
import { sessionReducer } from './session'
import { historyProvider } from '../historyProvider'
import { reducerNames } from '../../consts/reducerNames'

export const rootReducer = {
  [reducerNames.Router]: connectRouter(historyProvider),
  [reducerNames.Session]: sessionReducer,
  [reducerNames.Notes]: notesReducer
}

export type ReducerState = StateFromReducersMapObject<typeof rootReducer>
