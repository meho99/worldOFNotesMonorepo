import { emailField, passwordField } from '../../fields/commonFields'

export type LoginValues = {
  email: string
  password: string
}

export const loginFields = {
  email: emailField(),
  password: passwordField(),
}
