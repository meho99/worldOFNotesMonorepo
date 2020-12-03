export type UserModel = Record<'email' | 'name', string>

export type SignUpRequest = Partial<UserModel & {
  password: string;
}>

export type LoginRequest = Pick<SignUpRequest, 'email' | 'password'>

export type LoginResponse = UserModel & {
  token: string;
}

export type SingUpResponse = LoginResponse

export type AuthResponse = UserModel
