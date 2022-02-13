import { NotificationTypes } from '../../consts'

export type NotificationData = {
  type: NotificationTypes
  message?: string
  createdAt: Date
  id: string
}
