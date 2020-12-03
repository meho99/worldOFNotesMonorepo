import React from 'react'
import configureStore from 'redux-mock-store'
import { render } from '@testing-library/react'

import { HeaderComponent } from '../../../src/layout/header/HeaderComponent'
import { FiniteStates } from '../../../src/consts/finiteStates'
import { CreateProvider } from '../../../src/testUtils'

describe('HeaderComponent test', () => {configureStore
  it('Snapshot test', () => {
    expect(render(<HeaderComponent />, {
      wrapper: CreateProvider({
        session: {
          authenticatingStatus: FiniteStates.Success
        }
      })
    }).container).toMatchSnapshot()
  })
})
