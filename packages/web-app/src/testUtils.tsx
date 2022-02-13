import React from 'react'
import { DeepPartial } from 'redux'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { ReducerState } from './redux/rootReducer'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'

const mockStore = configureStore()

const mockTheme = createTheme()

export const CreateProvider =
  (testState: DeepPartial<ReducerState>): React.FC =>
  ({ children }) =>
    (
      <Provider store={mockStore(testState)}>
        {' '}
        <ThemeProvider theme={mockTheme}> {children} </ThemeProvider>
      </Provider>
    )

export const RouterProvider: React.FC = ({ children }) => (
  <Router history={createMemoryHistory()}> {children} </Router>
)
