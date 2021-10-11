import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { TextInputProps } from './TextInput.types'
import { useStyles } from './TextInput.styles'

export const TextInput: React.FC<TextInputProps> = ({ errors, name = '', ...props }) => {
  const classes = useStyles()
  const hasError = Boolean(errors?.[name])

  return (
    <>
      <TextField
        className={classes.input}

        variant='outlined'
        error={hasError}
        name={name}
        {...props}
      />
      <Typography variant='body2' color='error' className={classes.inputError}>
        {hasError && errors?.[name].message}
      </Typography>
    </>
  )
}
