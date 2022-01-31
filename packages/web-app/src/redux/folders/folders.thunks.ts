import { createAsyncThunk } from '@reduxjs/toolkit'

import { AddFolderRequest, UserFoldersResponse } from '@won/core'
import { FetchingErrors, ReducerNames } from '../../consts'
import { addFolder, getFolders } from '../../api/folders'
import { errorThunk } from '../notifications/notifications.helpers'
import { notificationsActions } from '../notifications/notifications.reducer'

export const fetchFoldersThunk = createAsyncThunk<UserFoldersResponse>(
  `${ReducerNames.Folders}/fetchFolders`,
  async (_, { dispatch }) => {
    try {
      const folders = await getFolders()

      return folders
    } catch (e) {
      errorThunk({ e, dispatch, defaultMessage: FetchingErrors.FetchError })
      throw e
    }
  }
)

export const addFolderThunk = createAsyncThunk(
  `${ReducerNames.Folders}/addFolder`,
  async (requestData: AddFolderRequest, { dispatch }) => {
    try {
      const addFolderResponse = await addFolder(requestData)

      await dispatch(fetchFoldersThunk())

      dispatch(notificationsActions.addSuccessNotification('Folder added successfully!'))
      return addFolderResponse
    } catch (e) {
      errorThunk({ e, dispatch, defaultMessage: FetchingErrors.FetchError })
    }
  }
)
