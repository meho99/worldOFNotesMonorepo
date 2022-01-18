import { createStyles, makeStyles } from '@mui/styles'
import { alpha } from '@mui/system/colorManipulator'

export const useStyles = makeStyles(({ spacing, palette }) => createStyles({
  link: {
    marginTop: spacing(3),
    padding: 5,
    '&:focus, &:hover': {
      backgroundColor: alpha(palette.action.active, palette.action.hoverOpacity),
      borderRadius: 20,
    }
  }
}))
