import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(({ spacing }) => createStyles({
  menuButton: {
    marginRight: spacing(1),
  },
  title: {
    flexGrow: 1,
  }
}))
