import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { TextInputProps } from './TextInput.types'
import { useStyles } from './TextInput.styles'

export const TextInput: React.FC<TextInputProps> = ({ errors, name, ...props }) => {
  const classes = useStyles()
  const fieldName = name as string
  const hasError = Boolean(errors?.[fieldName])

  return (
    <>
      <TextField
        variant='outlined'
        error={hasError}
        name={fieldName}
        {...props}
      />
      <Typography variant='body2' color='error' className={classes.inputError}>
        {hasError && errors?.[fieldName].message}
      </Typography>
    </>
  )
}
