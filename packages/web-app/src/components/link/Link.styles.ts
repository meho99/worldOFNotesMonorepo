import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(({ spacing, palette, }) => createStyles({
  link: {
    marginTop: spacing(3),
    padding: 5,
    '&:focus, &:hover': {
      backgroundColor: palette.grey[900],
      borderRadius: 20,
    }
  }
}))
