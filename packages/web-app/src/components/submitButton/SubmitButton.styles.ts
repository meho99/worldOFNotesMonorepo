import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles(({ spacing }) => createStyles({
  button: {
    marginTop: spacing(2),
    fontWeight: 'bold',
  },
  circle: {
    position: 'absolute'
  }
}))
