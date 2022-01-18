import React from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import { useStyles } from './SubmitButton.styles'
import { SubmitButtonProps } from './SubmitButton.types'

export const SubmitButton: React.FC<SubmitButtonProps> = ({ children, isLoading }) => {
  const classes = useStyles()

  return (
    <Button
      type='submit'
      color='primary'
      variant='contained'
      disabled={isLoading}
      className={classes.button}
    >
      {
        isLoading && <CircularProgress
          size={30}
          thickness={6}
          color='primary'
          className={classes.circle}
        />
      }
      {children}
    </Button>
  )
}
