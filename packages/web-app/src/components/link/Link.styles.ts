import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(({ spacing }) => createStyles({
  link: {
    marginTop: spacing(3)
  }
}))