import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles(({ spacing }) =>
  createStyles({
    menuButton: {
      marginRight: spacing(1),
    },
    title: {
      flexGrow: 1,
    },
  }),
)
