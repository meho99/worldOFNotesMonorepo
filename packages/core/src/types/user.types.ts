export type UserModel = Record<'email' | 'name', string> & {
  id: string;
}

export type SignUpRequest =
  Pick<UserModel, 'email' | 'name'> & {
    password: string;
  }

export type LoginRequest = Pick<SignUpRequest, 'email' | 'password'>

export type LoginResponse = UserModel & {
  token: string;
}

export type SingUpResponse = LoginResponse

export type AuthResponse = UserModel
