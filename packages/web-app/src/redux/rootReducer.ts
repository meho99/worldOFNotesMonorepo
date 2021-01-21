import { connectRouter } from 'connected-react-router'
import { StateFromReducersMapObject } from 'redux'
import { ReducerNames } from '../consts'

import { historyProvider } from './historyProvider'
import { notesReducer } from './notes/notes.reducer'
import { notificationsReducer } from './notifications/notifications.reducer'
import { sessionReducer } from './session/session.reducer'

export const rootReducer = {
  [ReducerNames.Router]: connectRouter(historyProvider),
  [ReducerNames.Session]: sessionReducer,
  [ReducerNames.Notes]: notesReducer,
  [ReducerNames.Notifications]: notificationsReducer
}

export type ReducerState = StateFromReducersMapObject<typeof rootReducer>
