import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { StyledEngineProvider } from '@mui/material/styles'

import { store } from './redux'
import { ThemeProvider } from './theme'
import { App } from './App'
import { historyProvider } from './redux/historyProvider'

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <ThemeProvider>
        <ConnectedRouter history={historyProvider}>
          <App />
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  </StyledEngineProvider>,
  document.getElementById('root'),
)
