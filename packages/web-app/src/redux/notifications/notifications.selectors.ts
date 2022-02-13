import { createSelector } from '@reduxjs/toolkit'

import { ReducerNames } from '../../consts'
import { ReducerState } from '../rootReducer'
import { notificationsAdapter } from './notifications.reducer'
import { NotificationData } from './notifications.types'

const notificationState = (state: ReducerState) => state[ReducerNames.Notifications]

export const notificationAdapterSelectors =
  notificationsAdapter.getSelectors(notificationState)

/** returns most important notification(list is sorted due to 'sortCompare' function in notificationsAdapter) */
export const getNotificationSelector = createSelector(
  notificationAdapterSelectors.selectAll,
  (notifications): NotificationData | undefined => notifications[0],
)
