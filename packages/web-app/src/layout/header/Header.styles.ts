import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(({ palette }) => createStyles({
  menuButton: {
    marginRight: '5px',
  },
  title: {
    flexGrow: 1,
  }
}))
