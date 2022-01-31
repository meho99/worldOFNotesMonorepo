import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FolderModel } from '@won/core'
import { ReducerNames, FiniteStates } from '../../consts'
import { addFolderThunk, fetchFoldersThunk } from './folders.thunks'

type FoldersList = {
  data: Array<FolderModel>;
  status: FiniteStates;
}
export class FoldersState {
  folders: FoldersList = {
    data: [],
    status: FiniteStates.Idle
  };
  addFolderStatus: FiniteStates = FiniteStates.Idle;
  currentFolder?: number = undefined
}

const initialState = { ...new FoldersState() }

const foldersSlice = createSlice({
  name: ReducerNames.Folders,
  initialState,
  reducers: {
    setCurrentFolder: (state, { payload }: PayloadAction<FoldersState['currentFolder']>) => {
      state.currentFolder = payload
    }
  },
  extraReducers: builder => {

    // -- GET FOLDERS --

    builder.addCase(fetchFoldersThunk.pending, state => {
      state.folders.status = FiniteStates.Loading
    })
    builder.addCase(fetchFoldersThunk.rejected, state => {
      state.folders.status = FiniteStates.Failure
    })
    builder.addCase(fetchFoldersThunk.fulfilled, (state, { payload }) => {
      const { folders } = payload

      state.folders.data = folders
      state.folders.status = FiniteStates.Success
    })

    // -- ADD FOLDER --

    builder.addCase(addFolderThunk.pending, state => {
      state.addFolderStatus = FiniteStates.Loading
    })
    builder.addCase(addFolderThunk.rejected, state => {
      state.addFolderStatus = FiniteStates.Failure
    })
    builder.addCase(addFolderThunk.fulfilled, (state) => {
      state.addFolderStatus = FiniteStates.Success
    })
  }
})

export const foldersActions = foldersSlice.actions
export const foldersReducer = foldersSlice.reducer
