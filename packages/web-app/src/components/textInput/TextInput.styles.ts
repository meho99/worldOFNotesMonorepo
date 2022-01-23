import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles(({ spacing }) => createStyles({
  inputError: {
    marginBottom: spacing(3),
    marginTop: spacing(1),
  },
  input: {
    width: '100%'
  }
}))
