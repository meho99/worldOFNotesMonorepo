import { createSelector } from '@reduxjs/toolkit'

import { keyNames } from '../../consts'
import { ReducerState } from '../reducers'

const sessionState = (state: ReducerState) => state[keyNames.Session]

export const userIdSelector = createSelector(sessionState, state => state.userId)
export const isAuthenticated = createSelector(sessionState, state => state.isAuthenticated)
