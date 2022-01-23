import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createGenerateClassName, StylesProvider } from '@mui/styles'

import { store } from './redux'
import { ThemeProvider } from './theme'
import { App } from './App'
import { historyProvider } from './redux/historyProvider'

const generateClassName = createGenerateClassName({
  productionPrefix: 'won',
  disableGlobal: true
})

ReactDOM.render(
  <StylesProvider injectFirst generateClassName={generateClassName}>
    <Provider store={store}>
      <ThemeProvider>
        <ConnectedRouter history={historyProvider}>
          <App />
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  </StylesProvider>,
  document.getElementById('root')
)
