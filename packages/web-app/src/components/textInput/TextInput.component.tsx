import React from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { TextInputProps } from './TextInput.types'

export const TextInput: React.FC<TextInputProps> = ({ errors, name = '', ...props }) => {
  const hasError = Boolean(errors?.[name])

  return (
    <>
      <TextField
        sx={{ width: '100%' }}
        variant='outlined'
        error={hasError}
        name={name}
        {...props}
      />
      <Typography variant='body2' color='error'>
        {hasError && errors?.[name].message}
      </Typography>
    </>
  )
}
