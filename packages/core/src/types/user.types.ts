export type UserModel = Record<'email' | 'name', string>

export type SignUpRequest = Partial<UserModel & {
  password: string;
}>

export type LoginRequest = Pick<SignUpRequest, 'email' | 'password'>
