import axios, { AxiosResponse } from 'axios'

import { AddFolderRequest, AddFolderResponse, UserFoldersResponse } from '@won/core'
import { createAuthHeaders } from './headers'

export const getFolders = async () => {
  const response = await axios({
    method: 'GET',
    headers: createAuthHeaders(),
    url: '.netlify/functions/getUserFolders',
  }) as AxiosResponse<UserFoldersResponse>
  
  return response.data
}

export const addFolder = async (requestData: AddFolderRequest) => {
  const response = await axios({
    method: 'POST',
    headers: createAuthHeaders(),
    data: requestData,
    url: '.netlify/functions/addFolder',
  }) as AxiosResponse<AddFolderResponse>

  return response.data
}
