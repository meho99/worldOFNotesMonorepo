import axios, { AxiosResponse } from 'axios'

import { SingUpResponse, SignUpRequest } from '@won/core'

export const signUpUser = async (userData: SignUpRequest) => {
  const response = (await axios({
    method: 'POST',
    url: '.netlify/functions/signUp',
    data: userData,
  })) as AxiosResponse<SingUpResponse>

  return response.data
}
