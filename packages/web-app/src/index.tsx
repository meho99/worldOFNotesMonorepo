import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles'
import { ConnectedRouter } from 'connected-react-router'

import { store } from './redux'
import { ThemeProvider } from './theme'
import { App } from './App'
import { historyProvider } from './redux/historyProvider'

const generateClassName = createGenerateClassName({
  productionPrefix: 'won',
  disableGlobal: true
})

ReactDOM.render(
  <StylesProvider generateClassName={generateClassName} injectFirst>
    <ThemeProvider variant='dark'>
      <Provider store={store}>
        <ConnectedRouter history={historyProvider}>
          <App />
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById('root')
)
