export enum FieldsErrors {
  PasswordToShort = 'Password must have at least 8 characters',
  PasswordToLong = 'Password must have less than 8 characters',
  NameToShort = 'Name must have at least 3 characters',
  NameToLong = 'Name must have less than 25 characters',
  Required = 'Required field',
  InvalidEmailFormat = 'Invalid email address'
}

export enum FetchingErrors {
  LoginError = 'Unable to login. Please check your email and password and try again.',
  SingUpError = 'Unable to sign up. Please check your email and password and try again.',
  Unauthorized = 'Unauthorized'
}
