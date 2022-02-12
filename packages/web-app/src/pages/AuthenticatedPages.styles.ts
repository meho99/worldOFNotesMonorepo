import { createStyles, makeStyles } from '@mui/styles'

export const useAuthenticatedPagesStyles = makeStyles(() =>
  createStyles({
    progressContainer: {
      height: '90vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
)
