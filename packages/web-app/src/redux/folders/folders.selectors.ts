import { createSelector } from '@reduxjs/toolkit'

import { ReducerNames } from '../../consts'
import { ReducerState } from '../rootReducer'

const foldersState = (state: ReducerState) => state[ReducerNames.Folders]

export const foldersDataSelector = createSelector(foldersState, state => state.folders.data)
export const foldersStatusSelector = createSelector(foldersState, state => state.folders.status)
export const currentFolderSelector = createSelector(foldersState, state => state.currentFolder)
export const addFolderStatusSelector = createSelector(foldersState, state => state.addFolderStatus)