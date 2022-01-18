import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles(({ spacing }) => createStyles({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    marginBottom: `${spacing(7)}px !important`
  }
}))
