import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/CancelRounded'
import Alert, { AlertProps } from '@material-ui/lab/Alert'

import { NotificationTypes } from '../../consts'
import { useNotificationData } from './Notifications.hooks'
import { useNotificationsStyles } from './Notifications.styles'

const NOTIFICATION_DURATION = 6000

const NotificationComponents = {
  [NotificationTypes.Error]: (props: AlertProps) => <Alert severity={NotificationTypes.Error} {...props}></Alert>
}

export const NotificationsComponent: React.FC = ({ children }) => {
  const classes = useNotificationsStyles()
  const { notificationData, clearNotification, showNotification } = useNotificationData()

  const NotificationComponent = notificationData.type
    ? NotificationComponents[notificationData.type]
    : () => <></>

  return (
    <>
      {
        showNotification && <Snackbar
          open={showNotification}
          onClose={clearNotification}
          autoHideDuration={NOTIFICATION_DURATION}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
          <NotificationComponent
            variant='standard'
            className={classes.notification}
            action={
              <IconButton className={classes.closeButton} onClick={clearNotification}>
                <CloseIcon fontSize='small' color='error'/>
              </IconButton>
            }
          >
            {notificationData.message}
          </NotificationComponent>
        </Snackbar>
      }
      {children}
    </>
  )
}
