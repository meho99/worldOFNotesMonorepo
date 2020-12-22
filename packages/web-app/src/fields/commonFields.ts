import { FieldsErrors } from '../consts'

export const emailField = (name = 'email') => {
  return {
    fieldProps: {
      label: 'EMAIL ADDRESS',
      name,
      placeholder: 'Type email'
    },
    validation: {
      required: FieldsErrors.Required,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: FieldsErrors.InvalidEmailFormat
      }
    }
  }
}

export const passwordField = (name = 'password') => {
  return {
    fieldProps: {
      label: 'PASSWORD',
      name,
      type: 'password',
      placeholder: 'Type password'
    },
    validation: {
      required: FieldsErrors.Required,
      minLength: {
        value: 8,
        message: FieldsErrors.PasswordToShort
      },
      maxLength: {
        value: 99,
        message: FieldsErrors.PasswordToLong
      }
    }
  }
}

export const nameField = (name = 'name') => {
  return {
    fieldProps: {
      label: 'USERNAME',
      name,
      type: 'text',
      placeholder: 'Type name'
    },
    validation: {
      required: FieldsErrors.Required,
      minLength: {
        value: 3,
        message: FieldsErrors.NameToShort
      },
      maxLength: {
        value: 25,
        message: FieldsErrors.NameToLong
      }
    }
  }
}
