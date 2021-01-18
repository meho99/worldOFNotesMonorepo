import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import MailIcon from '@material-ui/icons/Mail'
import InputAdornment from '@material-ui/core/InputAdornment'
import LockIcon from '@material-ui/icons/Lock'
import Typography from '@material-ui/core/Typography/Typography'

import { TextInput } from '../../components/textInput/TextInput'
import { loginFields, LoginValues } from './Login.fields'
import { useStyles } from './Login.styles'
import { CenteredContainer } from '../../components/centeredContainer/CenteredContainer'
import { Urls } from '../../consts'
import { LinkComponent } from '../../components/link/LinkComponent'
import { SubmitButton } from '../../components/submitButton/SubmitButton'
import { loginThunk } from '../../redux/session/session.thunks'

export const LoginComponent = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { register, handleSubmit, errors } = useForm<LoginValues>();
  const onSubmit = (values: LoginValues) => {
    dispatch(loginThunk(values))
  };

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
            ),
          }}
        />

        <TextInput
          {...loginFields.password.fieldProps}
          errors={errors}
          inputRef={register(loginFields.password.validation)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <LockIcon color='primary' />
              </InputAdornment>
            ),
          }}
        />

        <SubmitButton>
          Login
        </SubmitButton>

        <LinkComponent to={Urls.SignUp}>
          Don't have an account?
        </LinkComponent>
      </form>
    </CenteredContainer>
  )
}
