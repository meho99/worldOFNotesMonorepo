import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Box from '@mui/material/Box'

import { Urls } from './consts'
import { HeaderComponent } from './layout/header/Header.component'
import { LoginComponent } from './pages/login/Login.component'
import { AuthenticatedPages } from './pages/AuthenticatedPages'
import { SignUpComponent } from './pages/signUp/SignUp.component'
import { NotificationsComponent } from './components/notifications/Notifications.component'

export const App = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: ({ palette }) => palette.background.default,
      }}
    >
      <HeaderComponent />
      <NotificationsComponent>
        <Switch>
          <Route exact path={Urls.Login} component={LoginComponent} />
          <Route exact path={Urls.SignUp} component={SignUpComponent} />
          <Route exact path='*' component={AuthenticatedPages} />
        </Switch>
      </NotificationsComponent>
    </Box>
  )
}

App.displayName = 'AppComponent'
