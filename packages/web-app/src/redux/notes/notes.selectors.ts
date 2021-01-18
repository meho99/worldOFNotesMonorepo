import { createSelector } from '@reduxjs/toolkit'

import { ReducerNames } from '../../consts'
import { ReducerState } from '../rootReducer'

const notesState = (state: ReducerState) => state[ReducerNames.Notes]

export const folderNameSelector = createSelector(notesState, state => state.folderName)