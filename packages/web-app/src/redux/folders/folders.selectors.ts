import { createSelector } from '@reduxjs/toolkit'

import { ReducerNames } from '../../consts'
import { ReducerState } from '../rootReducer'

const foldersState = (state: ReducerState) => state[ReducerNames.Folders]

export const foldersDataSelector = createSelector(foldersState, state => state.data)
export const foldersStatusSelector = createSelector(foldersState, state => state.status)
export const currentFolderSelector = createSelector(foldersState, state => state.currentFolder)
