import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useNotificationsStyles = makeStyles(({ spacing, palette }) => createStyles({
  notification: {
    color: palette.text.primary
  },
  closeButton: {
    padding: 0,
    borderRadius: 0,
    marginLeft: spacing(8),
    paddingLeft: spacing(1),
    borderLeft: `1px solid ${palette.error.main}`
  }
}))
