import { createSelector } from '@reduxjs/toolkit'

import { ThemeTypes, ReducerNames, FiniteStates } from '../../consts'
import { ReducerState } from '../rootReducer'

const sessionState = (state: ReducerState) => state[ReducerNames.Session]

export const isDarkThemeSelector = createSelector(
  sessionState,
  (state) => state.theme === ThemeTypes.Dark,
)
export const themeTypeSelector = createSelector(sessionState, (state) => state.theme)
export const userDataSelector = createSelector(sessionState, (state) => state.user)
export const isAuthenticatedSelector = createSelector(
  sessionState,
  (state) => state.authenticatingStatus === FiniteStates.Success,
)
export const authenticatingStatusSelector = createSelector(
  sessionState,
  (state) => state.authenticatingStatus,
)
export const isLoginLoadingSelector = createSelector(
  sessionState,
  (state) => state.loginStatus === FiniteStates.Loading,
)
export const isSignUpLoadingSelector = createSelector(
  sessionState,
  (state) => state.signUpStatus === FiniteStates.Loading,
)
