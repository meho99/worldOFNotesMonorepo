import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import MailIcon from '@material-ui/icons/Mail'
import InputAdornment from '@material-ui/core/InputAdornment'
import LockIcon from '@material-ui/icons/Lock'
import Typography from '@material-ui/core/Typography/Typography'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

import { TextInput } from '../../components/textInput/TextInput'
import { signUpFields, SignUpValues } from './SignUp.fields'
import { useStyles } from './SignUp.styles'
import { signUpThunk } from '../../redux/thunks/session'
import { CenteredContainer } from '../../components/centeredContainer/CenteredContainer'
import { Urls } from '../../consts'
import { LinkComponent } from '../../components/link/LinkComponent'
import { SubmitButton } from '../../components/submitButton/SubmitButton'

export const SignUpComponent = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

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
            ),
          }}
        />

        <TextInput
          {...signUpFields.password.fieldProps}
          errors={errors}
          inputRef={register(signUpFields.password.validation)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <LockIcon color='primary' />
              </InputAdornment>
            ),
          }}
        />

        <SubmitButton>
          Sign Up
        </SubmitButton>

        <LinkComponent to={Urls.Login}>
          Already have an account?
        </LinkComponent>
      </form>
    </CenteredContainer >
  )
}
