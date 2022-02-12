import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles(({ palette, spacing, breakpoints, shadows }) =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: palette.background.default,
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      boxShadow: shadows[3],
      borderRadius: spacing(1),
      padding: spacing(8),
      position: 'absolute',
      top: '50%',
      backgroundColor: palette.background.paper,
      transform: 'translate(0, -50%)',
      [breakpoints.down('sm')]: {
        boxShadow: 'none',
        padding: `${spacing(4)} 0}`,
        width: '100%',
      },
    },
  }),
)
