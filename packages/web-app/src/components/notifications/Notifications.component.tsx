import React from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { hasNotifications, useNotificationData } from './Notifications.hooks'

const NOTIFICATION_DURATION = 6 * 1000

export const NotificationsComponent: React.FC = ({ children }) => {
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
            sx={({ shadows }) => ({ maxWidth: '100%', boxShadow: shadows[3] })}
          >
            {notificationData.message}
          </Alert>
        </Snackbar>
      )}
      {children}
    </>
  )
}
