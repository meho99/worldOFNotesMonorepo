import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/CancelRounded'
import Alert, { AlertProps } from '@material-ui/lab/Alert'

import { NotificationTypes } from '../../consts'
import { hasNotifications, useNotificationData } from './Notifications.hooks'
import { useNotificationsStyles } from './Notifications.styles'

const NOTIFICATION_DURATION = 6 * 1000

const NotificationComponents = {
  [NotificationTypes.Error]: (props: AlertProps) => <Alert severity={NotificationTypes.Error} {...props}></Alert>
}

export const NotificationsComponent: React.FC = ({ children }) => {
  const classes = useNotificationsStyles()
  const { notificationData, removeCurrentNotification, showNotification } = useNotificationData()

  const NotificationComponent = notificationData?.type
    ? NotificationComponents[notificationData.type]
    : () => <></>

  return (
    <>
      {
        hasNotifications(showNotification, notificationData) && <Snackbar
          open={showNotification}
          onClose={removeCurrentNotification}
          autoHideDuration={NOTIFICATION_DURATION}
          ClickAwayListenerProps={{ onClickAway: () => {} }}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
          <NotificationComponent
            variant='standard'
            className={classes.notification}
            action={
              <IconButton className={classes.closeButton} onClick={removeCurrentNotification}>
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
