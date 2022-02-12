import { NotificationTypes } from '../../../src/consts'
import { NotificationData } from '../../../src/redux/notifications/notifications.types'
import { sortNotifications } from '../../../src/redux/notifications/notifications.reducer'

describe('notificationsReducer test', () => {
  it('properly sorts notifications', () => {
    const testNotificationsList: NotificationData[] = [
      {
        id: '1',
        type: NotificationTypes.Success,
        createdAt: new Date('04/02/2020'),
      },
      {
        id: '2',
        type: NotificationTypes.Error,
        createdAt: new Date('02/02/2020'),
      },
      {
        id: '3',
        type: NotificationTypes.Success,
        createdAt: new Date('02/02/2020'),
      },
      {
        id: '4',
        type: NotificationTypes.Error,
        createdAt: new Date('03/02/2020'),
      },
    ]

    const expectedSortedList = [
      testNotificationsList[3],
      testNotificationsList[1],
      testNotificationsList[0],
      testNotificationsList[2],
    ]

    testNotificationsList.sort(sortNotifications)

    expect(testNotificationsList).toEqual(expectedSortedList)
  })
})
