import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react'
import { useForm } from "react-hook-form";

import { useStyles } from './Login.styles'
interface IFormInput {
  email: string;
  password: string;
}


export const LoginComponent = () => {
  const classes = useStyles()

  const { register, handleSubmit, errors } = useForm<IFormInput>();
  //const onSubmit = (data: IFormInput) => console.log(data);
  const onSubmit = values => console.log(values);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          className={classes.inputText}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          name="email"
          inputRef={register({
            required: "You must specify an email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }
          })}
        />
        <Typography className={classes.inputError}>{errors.email && errors.email.message}</Typography>

        <TextField
          className={classes.inputText}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          name="password"
          type="password"
          inputRef={register({
            required: "You must specify a password",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters"
            }
          })}
        />
        <Typography className={classes.inputError}>{errors.password && errors.password.message}</Typography>

        <Button type="submit" variant="contained" color="primary">
          Primary
        </Button>
      </form>
    </div>
  )
}
