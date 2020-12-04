import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(({ palette }) => createStyles({
  root: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: palette.background.default
  },
}))
