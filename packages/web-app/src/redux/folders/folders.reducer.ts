import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FolderModel } from '@won/core'
import { ReducerNames, FiniteStates } from '../../consts'

export class FoldersState {
  data: Array<FolderModel> = [];
  status: FiniteStates = FiniteStates.Idle;
  currentFolder?: number = undefined
}

const initialState = { ...new FoldersState() }

const foldersSlice = createSlice({
  name: ReducerNames.Folders,
  initialState,
  reducers: {
    setFolders: (state, { payload }: PayloadAction<Array<FolderModel>>) => {
      state.data = payload
      state.status = FiniteStates.Success
    },
    fetchFoldersFailure: (state) => {
      state.status = FiniteStates.Failure
    },
    fetchFolders: (state) => {
      state.data = []
      state.status = FiniteStates.Loading
    },
    setCurrentFolder: (state, { payload }: PayloadAction<FoldersState['currentFolder']>) => {
      state.currentFolder = payload
    }
  }
})

export const foldersActions = foldersSlice.actions
export const foldersReducer = foldersSlice.reducer
