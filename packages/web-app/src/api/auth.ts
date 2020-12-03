import axios, { AxiosResponse } from 'axios'

import { AuthResponse } from '@won/core'
import { createAuthHeaders } from './headers'

export const authenticateUser = async (token: string) => {
  const response = await axios({
    url: '.netlify/functions/auth',
    headers: createAuthHeaders(token)
  }) as AxiosResponse<AuthResponse>
  

  return response.data
}
