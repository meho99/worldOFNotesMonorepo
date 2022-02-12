import React from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { useNotificationsStyles } from './Notifications.styles'
import { hasNotifications, useNotificationData } from './Notifications.hooks'

const NOTIFICATION_DURATION = 6 * 1000

export const NotificationsComponent: React.FC = ({ children }) => {
  const classes = useNotificationsStyles()
  const { notificationData, removeCurrentNotification, showNotification } =
    useNotificationData()

  return (
    <>
      {hasNotifications(showNotification, notificationData) && (
        <Snackbar
          open={showNotification}
          onClose={removeCurrentNotification}
          autoHideDuration={NOTIFICATION_DURATION}
          ClickAwayListenerProps={{ onClickAway: () => {} }}
        >
          <Alert
            onClose={removeCurrentNotification}
            severity={notificationData.type}
            className={classes.notification}
          >
            {notificationData.message}
          </Alert>
        </Snackbar>
      )}
      {children}
    </>
  )
}
