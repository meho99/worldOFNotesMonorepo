import React from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import { SubmitButtonProps } from './SubmitButton.types'

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  isLoading,
  className,
  disabled,
  ...buttonProps
}) => {
  return (
    <Button
      size='large'
      type='submit'
      color='primary'
      variant='contained'
      sx={{ mt: 1 }}
      disabled={disabled || isLoading}
      {...buttonProps}
    >
      {isLoading && (
        <CircularProgress
          size={30}
          thickness={6}
          color='primary'
          sx={{ position: 'absolute' }}
        />
      )}
      {children}
    </Button>
  )
}
