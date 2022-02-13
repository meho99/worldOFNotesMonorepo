import { PayloadAction } from '@reduxjs/toolkit'
import {
  foldersActions,
  foldersReducer,
  FoldersState,
} from '../../../src/redux/folders/folders.reducer'

const checkReducerState = <Payload = void>(
  initialState: FoldersState,
  expectedState: FoldersState,
  action: PayloadAction<Payload>,
) => {
  expect(foldersReducer(initialState, action)).toEqual(expectedState)
}

describe('foldersReducer test', () => {
  const testCurrentFolderId = 5

  it('setCurrentFolder test', () => {
    const initialState: FoldersState = {
      ...new FoldersState(),
    }
    const expectedState: FoldersState = {
      ...new FoldersState(),
      currentFolder: testCurrentFolderId,
    }
    checkReducerState(
      initialState,
      expectedState,
      foldersActions.setCurrentFolder(testCurrentFolderId),
    )
  })
})
