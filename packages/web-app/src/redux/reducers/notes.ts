import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReducerNames } from '../../consts'

export class NotesState {
  folderName: string = '';
}

export const notesSlice = createSlice({
  name: ReducerNames.Notes,
  initialState: { ...new NotesState() },
  reducers: {
    setFolderName: (state, { payload }: PayloadAction<string>) => {
      state.folderName = payload
    }
  }
})

export const notesActions = notesSlice.actions
export const notesReducer = notesSlice.reducer
