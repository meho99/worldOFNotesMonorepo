import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import MailIcon from '@mui/icons-material/Mail'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

import { TextInput } from '../../components/textInput/TextInput.component'
import { signUpFields, SignUpValues } from './SignUp.fields'
import { useStyles } from './SignUp.styles'
import { CenteredContainer } from '../../components/centeredContainer/CenteredContainer.component'
import { Urls } from '../../consts'
import { LinkComponent } from '../../components/link/Link.component'
import { SubmitButton } from '../../components/submitButton/SubmitButton.component'
import { signUpThunk } from '../../redux/session/session.thunks'
import { isSignUpLoadingSelector } from '../../redux/session/session.selectors'
import { PasswordField } from '../../components/passwordInput/PasswordInput.component'

export const SignUpComponent = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const isLoading = useSelector(isSignUpLoadingSelector)

  const { register, handleSubmit, errors } = useForm<SignUpValues>()

  const onSubmit = (values: SignUpValues) => {
    dispatch(signUpThunk(values))
  }

  return (
    <CenteredContainer>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Typography color='primary' variant='h1' className={classes.title}>
          Sign Up
        </Typography>

        <TextInput
          {...signUpFields.name.fieldProps}
          errors={errors}
          inputRef={register(signUpFields.name.validation)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountBoxIcon color='primary' />
              </InputAdornment>
            ),
          }}
        />

        <TextInput
          {...signUpFields.email.fieldProps}
          errors={errors}
          inputRef={register(signUpFields.email.validation)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <MailIcon color='primary' />
              </InputAdornment>
            )
          }}
        />

        <PasswordField
          {...signUpFields.password.fieldProps}
          errors={errors}
          inputRef={register(signUpFields.password.validation)}
        />

        <SubmitButton isLoading={isLoading}>
          Sign Up
        </SubmitButton>

        <LinkComponent to={Urls.Login}>
          Already have an account?
        </LinkComponent>
      </form>
    </CenteredContainer >
  )
}
