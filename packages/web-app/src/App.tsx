import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Urls } from './consts'
import { HeaderComponent } from './layout/header/Header.component'
import { LoginComponent } from './pages/login/Login.component'
import { AuthenticatedPages } from './pages/AuthenticatedPages'
import { useStyles } from './layout/BackgroundBody.style'
import { SignUpComponent } from './pages/signUp/SignUp.component'
import { NotificationsComponent } from './components/notifications/Notifications.component'

export const App = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <HeaderComponent />
      <NotificationsComponent>
        <Switch>
          <Route exact path={Urls.Login} component={LoginComponent} />
          <Route exact path={Urls.SignUp} component={SignUpComponent} />
          <Route exact path='*' component={AuthenticatedPages} />
        </Switch>
      </NotificationsComponent>
    </div>
  )
}

App.displayName = 'AppComponent'
