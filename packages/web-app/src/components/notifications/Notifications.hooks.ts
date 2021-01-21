import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notificationsActions } from '../../redux/notifications/notifications.reducer'
import { notificationDataSelector, shouldShowNotificationSelector } from '../../redux/notifications/notifications.selectors'

export const useNotificationData = () => {
  const dispatch = useDispatch()
  const notificationData = useSelector(notificationDataSelector)
  const showNotification = useSelector(shouldShowNotificationSelector)

  const clearNotification = useCallback(() => {
    dispatch(notificationsActions.clearNotification())
  }, [dispatch])

  return {
    showNotification,
    notificationData,
    clearNotification
  }
}
