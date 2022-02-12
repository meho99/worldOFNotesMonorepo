import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notificationsActions } from '../../redux/notifications/notifications.reducer'
import {
  getNotificationSelector,
  notificationAdapterSelectors,
} from '../../redux/notifications/notifications.selectors'
import { NotificationData } from '../../redux/notifications/notifications.types'

export const hasNotifications = (
  show: boolean,
  notification?: NotificationData,
): notification is NotificationData => show === true

export const useNotificationData = () => {
  const dispatch = useDispatch()
  const notificationData = useSelector(getNotificationSelector)
  const showNotification = useSelector(notificationAdapterSelectors.selectTotal) > 0

  const removeCurrentNotification = useCallback(() => {
    if (hasNotifications(showNotification, notificationData)) {
      dispatch(notificationsActions.removeNotification(notificationData.id))
    }
  }, [dispatch, notificationData, showNotification])

  return {
    showNotification,
    notificationData,
    removeCurrentNotification,
  }
}
