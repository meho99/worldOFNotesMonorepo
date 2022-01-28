import { createStyles, makeStyles } from '@mui/styles'
import { alpha } from '@mui/system/colorManipulator'

export const useStyles = makeStyles(({ spacing, palette }) => createStyles({
  link: {
    marginTop: spacing(2),
    borderRadius: 20,
    padding: 5,
    '&:focus, &:hover': {
      backgroundColor: alpha(palette.action.active, palette.action.hoverOpacity),
    }
  }
}))
