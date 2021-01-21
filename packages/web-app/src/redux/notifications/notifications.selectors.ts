import { createSelector } from '@reduxjs/toolkit'

import { ReducerNames } from '../../consts'
import { ReducerState } from '../rootReducer'


const notificationState = (state: ReducerState) => state[ReducerNames.Notifications]

export const notificationDataSelector = createSelector(notificationState, state => state.notificationData)
export const shouldShowNotificationSelector = createSelector(
  notificationDataSelector,
  notification => !!notification.message && !!notification.type
)
