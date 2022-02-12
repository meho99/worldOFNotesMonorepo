import { createStyles, makeStyles } from '@mui/styles'

export const useNotificationsStyles = makeStyles(
  ({ spacing, palette, shadows, breakpoints }) =>
    createStyles({
      notification: {
        color: palette.text.primary,
        boxShadow: shadows[3],
        maxWidth: '100%',
      },
    }),
)
