import React from 'react'
import { DeepPartial } from 'redux'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { ReducerState } from './redux/reducers'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const mockStore = configureStore()

export const CreateProvider = (testState: DeepPartial<ReducerState>): React.FC => ({ children }) =>
  <Provider store={mockStore(testState)}> {children} </Provider>


export const RouterProvider: React.FC = ({ children }) =>
  <Router history={createMemoryHistory()}> {children} </Router>
