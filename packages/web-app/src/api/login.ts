import axios, { AxiosResponse } from 'axios'

import { LoginRequest, LoginResponse } from '@won/core'

export const loginUser = async (userData: LoginRequest) => {
  const response = (await axios({
    method: 'POST',
    url: '.netlify/functions/login',
    data: userData,
  })) as AxiosResponse<LoginResponse>

  return response.data
}
