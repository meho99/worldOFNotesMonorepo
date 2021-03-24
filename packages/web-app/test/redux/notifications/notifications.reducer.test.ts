import { PayloadAction } from '@reduxjs/toolkit'
import { NotificationData } from '../../../src/redux/notifications/notifications.types'
import { NotificationTypes } from '../../../src/consts'
import { notificationsActions, notificationsReducer, NotificationsState } from '../../../src/redux/notifications/notifications.reducer'

const checkReducerState = <Payload = void>(initialState: NotificationsState, expectedState: NotificationsState, action: PayloadAction<Payload>) => {
  expect(
    notificationsReducer(initialState, action)
  ).toEqual(expectedState)
}

describe('notificationsReducer test', () => {
  const testNotificationsData: Required<NotificationData> = {
    message: 'wiadomosc',
    type: NotificationTypes.Error,
  }

  it('addErrorNotification test', () => {
    const initialState: NotificationsState = {
      ...new NotificationsState()
    }
    const expectedState: NotificationsState = {
      ...new NotificationsState(),
      notificationData: testNotificationsData
    }
    checkReducerState(initialState, expectedState, notificationsActions.addErrorNotification(testNotificationsData.message))
  })

  it('clearNotification test', () => {
    const initialState: NotificationsState = {
      ...new NotificationsState(),
      notificationData: testNotificationsData
    }
    const expectedState: NotificationsState = {
      ...new NotificationsState(),
      notificationData: {}
    }
    checkReducerState(initialState, expectedState, notificationsActions.clearNotification())
  })
})
