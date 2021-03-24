import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { generateId } from '@won/core'

import { ReducerNames, NotificationTypes } from '../../consts'
import { NotificationData } from './notifications.types'

/** priority of notifications based on type(asc) */
const notificationsPriority = [
  NotificationTypes.Success,
  NotificationTypes.Error
]

const checkPriority = (notification: NotificationData) => notificationsPriority.indexOf(notification.type)

export const sortNotifications = (a: NotificationData, b: NotificationData) => checkPriority(a) > checkPriority(b)
  ? -1
  : a.createdAt > b.createdAt ? -1 : 0

export const notificationsAdapter = createEntityAdapter<NotificationData>({
  selectId: notification => notification.id,
  sortComparer: sortNotifications
})

export type NotificationsState = ReturnType<typeof notificationsAdapter['getInitialState']>

const notificationsSlice = createSlice({
  name: ReducerNames.Notifications,
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    addErrorNotification: (state, { payload }: PayloadAction<string>) => {
      notificationsAdapter.addOne(state, {
        id: generateId(),
        message: payload,
        createdAt: new Date(),
        type: NotificationTypes.Error
      })
    },
    clearNotifications: notificationsAdapter.removeAll,
    removeNotification: notificationsAdapter.removeOne
  }
})

export const notificationsActions = notificationsSlice.actions
export const notificationsReducer = notificationsSlice.reducer
