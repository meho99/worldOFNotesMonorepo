import React from 'react'
import classNames from 'classnames'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import { useStyles } from './SubmitButton.styles'
import { SubmitButtonProps } from './SubmitButton.types'

export const SubmitButton: React.FC<SubmitButtonProps> = ({ children, isLoading, className, ...buttonProps }) => {
  const classes = useStyles()

  return (
    <Button
      type='submit'
      color='primary'
      variant='contained'
      disabled={isLoading}
      size='large'
      className={classNames(classes.button, className)}
      {...buttonProps}
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
