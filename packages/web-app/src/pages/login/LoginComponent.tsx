import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import MailIcon from '@material-ui/icons/Mail'
import InputAdornment from '@material-ui/core/InputAdornment'
import LockIcon from '@material-ui/icons/Lock'
import Typography from '@material-ui/core/Typography/Typography'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

import { TextInput } from '../../components/textInput/TextInput'
import { loginFields, LoginValues } from './Login.fields'
import { useStyles } from './Login.styles'
import { CenteredContainer } from '../../components/centeredContainer/CenteredContainer'
import { Urls } from '../../consts'
import { LinkComponent } from '../../components/link/LinkComponent'
import { SubmitButton } from '../../components/submitButton/SubmitButton'
import { loginThunk } from '../../redux/session/session.thunks'
import { isLoginLoadingSelector } from '../../redux/session/session.selectors'

export const LoginComponent = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const classes = useStyles()
  const dispatch = useDispatch()

  const isLoading = useSelector(isLoginLoadingSelector)

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
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility color='primary' /> : <VisibilityOff color='primary' />}
                </IconButton>
              </InputAdornment>
            )
          }}
          type={showPassword ? 'text' : 'password'}
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
