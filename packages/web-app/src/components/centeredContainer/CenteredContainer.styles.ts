import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(({ palette, spacing, breakpoints, shadows }) => createStyles({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.background.default
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    boxShadow: shadows[3],
    borderRadius: spacing(1),
    paddingTop: spacing(8),
    paddingBottom: spacing(8),
    paddingLeft: spacing(16),
    paddingRight: spacing(16),
    position: 'absolute',
    top: '50%',
    backgroundColor: palette.background.paper,
    transform: 'translate(0, -50%)',
    [breakpoints.down('xs')]: {
      boxShadow: 'none',
      padding: spacing(3)
    }
  }
}))
