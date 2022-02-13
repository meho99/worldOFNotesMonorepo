import { emailField, passwordField, nameField } from '../../fields/commonFields'

export type SignUpValues = {
  name: string
  email: string
  password: string
}

export const signUpFields = {
  name: nameField(),
  email: emailField(),
  password: passwordField(),
}
