import { createSelector } from '@reduxjs/toolkit'

import { FiniteStates } from '../../consts/finiteStates'
import { reducerNames } from '../../consts/reducerNames'
import { ThemeTypes } from '../../consts/themeTypes'
import { ReducerState } from '../reducers'

const sessionState = (state: ReducerState) => state[reducerNames.Session]

export const isDarkThemeSelector = createSelector(sessionState, state => state.theme === ThemeTypes.Dark)
export const themeTypeSelector = createSelector(sessionState, state => state.theme) 
export const userDataSelector = createSelector(sessionState, state => state.user)
export const isAuthenticatedSelector = createSelector(sessionState, state => state.authenticatingStatus === FiniteStates.Success)
