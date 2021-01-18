import React from 'react'
import { render } from '@testing-library/react'

import { HeaderComponent } from '../../../src/layout/header/HeaderComponent'
import { FiniteStates } from '../../../src/consts'
import { CreateProvider } from '../../../src/testUtils'

describe('HeaderComponent test', () => {
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
