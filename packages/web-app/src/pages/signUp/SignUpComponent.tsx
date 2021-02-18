import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import MailIcon from '@material-ui/icons/Mail'
import InputAdornment from '@material-ui/core/InputAdornment'
import LockIcon from '@material-ui/icons/Lock'
import Typography from '@material-ui/core/Typography/Typography'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

import { TextInput } from '../../components/textInput/TextInput'
import { signUpFields, SignUpValues } from './SignUp.fields'
import { useStyles } from './SignUp.styles'
import { CenteredContainer } from '../../components/centeredContainer/CenteredContainer'
import { Urls } from '../../consts'
import { LinkComponent } from '../../components/link/LinkComponent'
import { SubmitButton } from '../../components/submitButton/SubmitButton'
import { signUpThunk } from '../../redux/session/session.thunks'
import { isSignUpLoadingSelector } from '../../redux/session/session.selectors'

export const SignUpComponent = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
            endAdornment: (
              <InputAdornment position="end">
                <button
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility color='primary' /> : <VisibilityOff color='primary' />}
                </button>
              </InputAdornment>
            )
          }}
          type={showPassword ? 'text' : 'password'}
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
