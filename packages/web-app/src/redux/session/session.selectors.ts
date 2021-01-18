import { createSelector } from '@reduxjs/toolkit'

import { ThemeTypes, ReducerNames, FiniteStates } from '../../consts'
import { ReducerState } from '../rootReducer'


const sessionState = (state: ReducerState) => state[ReducerNames.Session]

export const isDarkThemeSelector = createSelector(sessionState, state => state.theme === ThemeTypes.Dark)
export const themeTypeSelector = createSelector(sessionState, state => state.theme)
export const userDataSelector = createSelector(sessionState, state => state.user)
export const isAuthenticatedSelector = createSelector(sessionState, state => state.authenticatingStatus === FiniteStates.Success)
