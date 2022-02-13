import axios from 'axios'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { AnyAction } from '@reduxjs/toolkit'

import { AddFolderRequest, FolderModel, UserFoldersResponse } from '@won/core'

import { FetchingErrors } from '../../../src/consts'
import {
  fetchFoldersThunk,
  addFolderThunk,
} from '../../../src/redux/folders/folders.thunks'
import { FoldersState } from '../../../src/redux/folders/folders.reducer'
import { notificationsActions } from '../../../src/redux/notifications/notifications.reducer'

jest.mock('axios')

afterEach(() => {
  jest.clearAllMocks()
})

const middlewares = [thunk]
const mockStore = configureMockStore<FoldersState, typeof middlewares>(middlewares)

describe('folders thunks tests', () => {
  describe('fetchFoldersThunk tests', () => {
    it('fetchFoldersThunk', async () => {
      axios['mockImplementationOnce'](() =>
        Promise.resolve({ data: fetchFoldersResponse }),
      )

      const userFolders: FolderModel[] = [
        {
          id: '123',
          description: 'test folder 1',
          name: 't1',
        },
        {
          id: '223',
          description: 'test folder 2',
          name: 't2',
        },
      ]

      const fetchFoldersResponse: UserFoldersResponse = {
        folders: userFolders,
      }

      const expectedActions = [
        expect.objectContaining({ type: fetchFoldersThunk.pending.type }),
        expect.objectContaining({
          type: fetchFoldersThunk.fulfilled.type,
          payload: fetchFoldersResponse,
        }),
      ]

      const store = mockStore({ ...new FoldersState() })

      await store.dispatch(fetchFoldersThunk() as unknown as AnyAction)

      expect(store.getActions()).toEqual(expectedActions)
    })

    it('fetchFoldersThunk error', async () => {
      axios['mockImplementationOnce'](() => Promise.reject({}))

      const expectedActions = [
        expect.objectContaining({ type: fetchFoldersThunk.pending.type }),
        expect.objectContaining({ type: fetchFoldersThunk.rejected.type }),
        notificationsActions.addErrorNotification(FetchingErrors.FetchError),
      ]

      const store = mockStore({ ...new FoldersState() })

      await store.dispatch(fetchFoldersThunk() as unknown as AnyAction)
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
    })
  })

  describe('addFolderThunk test', () => {
    it('happy path', async () => {
      const mockAddFolder = jest.fn().mockImplementation(() => Promise.resolve({}))

      axios['mockImplementationOnce'](mockAddFolder) // add folder request
      axios['mockImplementationOnce'](() => Promise.resolve({ folders: [folder] })) // fetch folders

      const folder: AddFolderRequest = {
        name: 'folder',
        description: 'test desc',
      }

      const expectedActions = [
        notificationsActions.addSuccessNotification('Folder added successfully!'),
        expect.objectContaining({ type: addFolderThunk.pending.type }),
        expect.objectContaining({ type: addFolderThunk.fulfilled.type }),
        /** should re-fetch folders */
        expect.objectContaining({
          type: fetchFoldersThunk.fulfilled.type,
        }),
      ]

      const store = mockStore({ ...new FoldersState() })

      await store.dispatch(addFolderThunk(folder) as unknown as AnyAction)
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))

      /** should make a request with proper body */
      expect(mockAddFolder).toHaveBeenCalledWith(
        expect.objectContaining({
          data: folder,
        }),
      )
    })

    it('failure', async () => {
      axios['mockImplementationOnce'](() => Promise.reject({})) // add folder request
      axios['mockImplementationOnce'](() => Promise.resolve({ folders: [folder] })) // fetch folders

      const folder: AddFolderRequest = {
        name: 'folder',
        description: 'test desc',
      }

      const expectedActions = [
        expect.objectContaining({ type: addFolderThunk.pending.type }),
        // expect.objectContaining({ type: addFolderThunk.rejected.type }),
        notificationsActions.addErrorNotification(FetchingErrors.SaveError),
      ]

      const unexpectedActions = [
        /** should not re-fetch folders in case of failure */
        expect.objectContaining({
          type: fetchFoldersThunk.pending.type,
        }),
      ]

      const store = mockStore({ ...new FoldersState() })

      await store.dispatch(addFolderThunk(folder) as unknown as AnyAction)
      expect(store.getActions()).not.toContain(unexpectedActions)
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
    })
  })
})
