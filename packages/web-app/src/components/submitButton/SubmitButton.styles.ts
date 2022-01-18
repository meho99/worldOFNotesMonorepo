import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles(({ spacing }) => createStyles({
  button: {
    marginTop: `${spacing(3)} !important`,
    fontWeight: 'bold',
  },
  circle: {
    position: 'absolute'
  }
}))
