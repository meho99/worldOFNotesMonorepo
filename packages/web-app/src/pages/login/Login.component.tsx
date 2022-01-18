import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import MailIcon from '@mui/icons-material/Mail'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'

import { Urls } from '../../consts'
import { loginThunk } from '../../redux/session/session.thunks'
import { isLoginLoadingSelector } from '../../redux/session/session.selectors'

import { TextInput } from '../../components/textInput/TextInput.component'
import { LinkComponent } from '../../components/link/Link.component'
import { SubmitButton } from '../../components/submitButton/SubmitButton.component'
import { PasswordField } from '../../components/passwordInput/PasswordInput.component'
import { CenteredContainer } from '../../components/centeredContainer/CenteredContainer.component'

import { useStyles } from './Login.styles'
import { loginFields, LoginValues } from './Login.fields'

export const LoginComponent = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const isLoading = useSelector(isLoginLoadingSelector)

  const { register, handleSubmit, errors } = useForm<LoginValues>()

  const onSubmit = (values: LoginValues) => {
    dispatch(loginThunk(values))
  }

  return (
    <CenteredContainer>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Typography color='primary' variant='h1' className={classes.title}> User Login </Typography>
        <TextInput
          {...loginFields.email.fieldProps}
          errors={errors}
          inputRef={register(loginFields.email.validation)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <MailIcon color='primary' />
              </InputAdornment>
            )
          }}
        />

        <PasswordField
          {...loginFields.password.fieldProps}
          errors={errors}
          inputRef={register(loginFields.password.validation)}
        />

        <SubmitButton isLoading={isLoading}>
          Login
        </SubmitButton>

        <LinkComponent to={Urls.SignUp}>
          Don't have an account?
        </LinkComponent>
      </form>
    </CenteredContainer>
  )
}
