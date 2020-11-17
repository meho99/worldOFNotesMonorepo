import { StateFromReducersMapObject } from 'redux'

import { notesReducer } from './notes'
import { sessionReducer } from './session'

export const rootReducer = {
  notes: notesReducer,
  session: sessionReducer
}

export type ReducerState = StateFromReducersMapObject<typeof rootReducer>
