import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import Grid from '@mui/material/Grid'
import MailIcon from '@mui/icons-material/Mail'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

import { Urls } from '../../consts'
import { signUpThunk } from '../../redux/session/session.thunks'
import { isSignUpLoadingSelector } from '../../redux/session/session.selectors'

import { LinkComponent } from '../../components/link/Link.component'
import { TextInput } from '../../components/textInput/TextInput.component'
import { SubmitButton } from '../../components/submitButton/SubmitButton.component'
import { PasswordField } from '../../components/passwordInput/PasswordInput.component'
import {
  CenteredContainer,
  CenteredFormContainer,
} from '../../components/centeredContainer/CenteredContainer.component'

import { signUpFields, SignUpValues } from './SignUp.fields'

export const SignUpComponent = () => {
  const dispatch = useDispatch()

  const { register, handleSubmit, errors, formState } = useForm<SignUpValues>()

  const isLoading = useSelector(isSignUpLoadingSelector)
  const disabled = formState.isSubmitted && !formState.isValid

  const onSubmit = (values: SignUpValues) => {
    dispatch(signUpThunk(values))
  }

  return (
    <CenteredContainer>
      <CenteredFormContainer onSubmit={handleSubmit(onSubmit)}>
        <Typography color='primary' variant='h1' sx={{ mb: 4 }}>
          Sign Up
        </Typography>

        <Grid container spacing={0}>
          <Grid item xs={12} margin={2}>
            <TextInput
              {...signUpFields.name.fieldProps}
              autoFocus
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
          </Grid>

          <Grid item xs={12} margin={2}>
            <TextInput
              {...signUpFields.email.fieldProps}
              errors={errors}
              inputRef={register(signUpFields.email.validation)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MailIcon color='primary' />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} margin={2}>
            <PasswordField
              {...signUpFields.password.fieldProps}
              errors={errors}
              inputRef={register(signUpFields.password.validation)}
            />
          </Grid>
        </Grid>

        <SubmitButton isLoading={isLoading} disabled={disabled}>
          Sign Up
        </SubmitButton>

        <LinkComponent to={Urls.Login}>Already have an account?</LinkComponent>
      </CenteredFormContainer>
    </CenteredContainer>
  )
}
