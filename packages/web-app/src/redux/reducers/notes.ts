import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { reducerNames } from '../../consts/reducerNames';

export class NotesState {
  folderName: string = '';
}

export const notesSlice = createSlice({
  name: reducerNames.Notes,
  initialState: { ...new NotesState() },
  reducers: {
    setFolderName: (state, { payload }: PayloadAction<string>) => {
      state.folderName = payload
    }
  }
})

export const notesActions = notesSlice.actions
export const notesReducer = notesSlice.reducer
