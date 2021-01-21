import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ReducerNames, NotificationTypes } from '../../consts'
import { NotificationData } from './notifications.types'

export class NotificationsState {
  notificationData: NotificationData = {};
}

const initialState = { ...new NotificationsState() }

const notificationsSlice = createSlice({
  name: ReducerNames.Notifications,
  initialState,
  reducers: {
    addErrorNotification: (state, { payload }: PayloadAction<string>) => {
      state.notificationData = {
        type: NotificationTypes.Error,
        message: payload
      }
    },
    clearNotification: (state) => {
      state.notificationData = {}
    }
  }
})

export const notificationsActions = notificationsSlice.actions
export const notificationsReducer = notificationsSlice.reducer
