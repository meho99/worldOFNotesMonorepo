import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(({ spacing }) => createStyles({
  inputError: {
    marginBottom: spacing(3),
    marginTop: spacing(1),
  },
  input: {
    width: '100%'
  }
}))
