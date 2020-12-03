import React from 'react'
import { DeepPartial } from 'redux'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { ReducerState } from './redux/reducers'

const mockStore = configureStore()

export const CreateProvider = (testState: DeepPartial<ReducerState>): React.FC => ({ children }) =>
  <Provider store={mockStore(testState)}> {children} </Provider>
