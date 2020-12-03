import { createSelector } from '@reduxjs/toolkit'

import { reducerNames } from '../../consts/reducerNames'
import { ReducerState } from '../reducers'

const notesState = (state: ReducerState) => state[reducerNames.Notes]

export const folderNameSelector = createSelector(notesState, state => state.folderName)
