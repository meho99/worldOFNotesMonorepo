import { StateFromReducersMapObject } from 'redux'

import { keyNames } from '../../consts'
import { notesReducer } from './notes'
import { sessionReducer } from './session'

export const rootReducer = {
  [keyNames.Notes]: notesReducer,
  [keyNames.Session]: sessionReducer
}

export type ReducerState = StateFromReducersMapObject<typeof rootReducer>
