import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles(({ palette }) => createStyles({
  root: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: palette?.background?.default
  },
}))
