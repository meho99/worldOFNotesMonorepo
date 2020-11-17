import { createSelector } from '@reduxjs/toolkit'

import { keyNames } from '../../consts'
import { ReducerState } from '../reducers'

const notesState = (state: ReducerState) => state[keyNames.Notes]

export const folderNameSelector = createSelector(notesState, state => state.folderName)
