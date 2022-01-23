import React from 'react'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { Visibility, VisibilityOff, Lock } from '@mui/icons-material'

import { TextInput } from '../textInput/TextInput.component'
import { PasswordInputProps } from './PasswordInput.types'
import { usePasswordVisibility } from './PasswordInput.hooks'

export const PasswordField: React.FC<PasswordInputProps> = (props) => {
  const {
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword
  } = usePasswordVisibility()

  return (
    <TextInput
      {...props}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Lock color='primary' />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size='small'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {
                showPassword
                  ? <VisibilityOff color='primary' fontSize='small' />
                  : <Visibility color='primary' fontSize='small' />
              }
            </IconButton>
          </InputAdornment>
        )
      }}
      type={showPassword ? 'text' : 'password'}
    />
  )
}
