import { PayloadAction } from '@reduxjs/toolkit'
import { FiniteStates } from '../../../src/consts'
import { foldersActions, foldersReducer, FoldersState } from '../../../src/redux/folders/folders.reducer'

const checkReducerState = <Payload = void>(initialState: FoldersState, expectedState: FoldersState, action: PayloadAction<Payload>) => {
  expect(
    foldersReducer(initialState, action)
  ).toEqual(expectedState)
}

describe('foldersReducer test', () => {
  const testFoldersData = [{
    description: 'opis',
    name: 'nazwa',
    id: 123
  }]

  const testCurrentFolderId = 5

  it('setFolders test', () => {
    const initialState: FoldersState = {
      ...new FoldersState(),
      status: FiniteStates.Idle
    }
    const expectedState: FoldersState = {
      ...new FoldersState(),
      data: testFoldersData,
      status: FiniteStates.Success
    }
    checkReducerState(initialState, expectedState, foldersActions.setFolders(testFoldersData))
  })

  it('fetchFoldersFailure test', () => {
    const initialState: FoldersState = {
      ...new FoldersState(),
      status: FiniteStates.Idle
    }
    const expectedState: FoldersState = {
      ...new FoldersState(),
      status: FiniteStates.Failure
    }
    checkReducerState(initialState, expectedState, foldersActions.fetchFoldersFailure())
  })

  it('fetchFolders test', () => {
    const initialState: FoldersState = {
      ...new FoldersState(),
      data: testFoldersData,
      status: FiniteStates.Idle
    }
    const expectedState: FoldersState = {
      ...new FoldersState(),
      data: [],
      status: FiniteStates.Loading
    }
    checkReducerState(initialState, expectedState, foldersActions.fetchFolders())
  })

  it('setCurrentFolder test', () => {
    const initialState: FoldersState = {
      ...new FoldersState()
    }
    const expectedState: FoldersState = {
      ...new FoldersState(),
      currentFolder: testCurrentFolderId
    }
    checkReducerState(initialState, expectedState, foldersActions.setCurrentFolder(testCurrentFolderId))
  })
})
