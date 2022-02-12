import axios, { AxiosResponse } from 'axios'

import { AuthResponse } from '@won/core'
import { createAuthHeaders } from './headers'

export const authenticateUser = async () => {
  const response = (await axios({
    url: '.netlify/functions/auth',
    headers: createAuthHeaders(),
  })) as AxiosResponse<AuthResponse>

  return response.data
}
