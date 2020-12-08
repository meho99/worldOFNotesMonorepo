import { FieldsErrors } from '../../consts'

export type LoginValues = {
  email: string;
  password: string;
}

export const loginFields = {
  email: {
    fieldProps: {
      label: 'EMAIL ADDRESS',
      name: 'email',
      placeholder: 'Type email'
    },
    validation: {
      required: FieldsErrors.Required,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: FieldsErrors.InvalidEmailFormat
      }
    },
  },
  password: {
    fieldProps: {
      label: 'PASSWORD',
      name: 'password',
      type: 'password',
      placeholder: 'Type password'
    },
    validation: {
      required: FieldsErrors.Required,
      minLength: {
        value: 8,
        message: FieldsErrors.PasswordToShort
      }
    }
  }

}
