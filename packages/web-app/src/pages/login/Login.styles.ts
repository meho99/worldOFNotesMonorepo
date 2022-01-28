import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles(({ spacing }) => createStyles({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: 450,
  },
  title: {
    marginBottom: spacing(4)
  }
}))
