import { createSelector } from '@reduxjs/toolkit'

import { reducerNames } from '../../consts/reducerNames'
import { ReducerState } from '../reducers'

const sessionState = (state: ReducerState) => state[reducerNames.Session]

export const userIdSelector = createSelector(sessionState, state => state.userId)
export const isAuthenticated = createSelector(sessionState, state => state.isAuthenticated)
