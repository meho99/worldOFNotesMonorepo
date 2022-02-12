import { AxiosError } from 'axios'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'

import { notificationsActions } from './notifications.reducer'

type NotificationWrapperConfig = {
  e: unknown
  defaultMessage: string
  dispatch: ThunkDispatch<any, any, AnyAction>
}

const prepareErrorMessage = (
  status = 400,
  message = '',
  defaultMessage = 'Fetching Error',
) => {
  if (status >= 400 && status < 500) {
    return message.length > 0 ? message : defaultMessage
  } else {
    return defaultMessage || 'Server Error'
  }
}

export const errorThunk = async ({
  e,
  dispatch,
  defaultMessage,
}: NotificationWrapperConfig) => {
  const error = e as AxiosError<Error>
  const { response } = error

  const errorMessage = prepareErrorMessage(
    response?.status,
    response?.data?.message,
    defaultMessage,
  )
  dispatch(notificationsActions.addErrorNotification(errorMessage))
}
