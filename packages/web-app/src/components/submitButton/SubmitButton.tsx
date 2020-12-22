import React from 'react'
import Button from '@material-ui/core/Button'

import { useStyles } from './SubmitButton.styles'

export const SubmitButton: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <Button className={classes.button} type='submit' variant='contained' color='primary'>
      {children}
    </Button>
  )
}
