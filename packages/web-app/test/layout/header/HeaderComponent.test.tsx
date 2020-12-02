import React from 'react'
import { render } from '@testing-library/react'

import { HeaderComponent } from '../../../src/layout/header/HeaderComponent'

describe('HeaderComponent test', () => {
  it('Snapshot test', () => {
    expect(render(<HeaderComponent />).container).toMatchSnapshot()
  })
})
