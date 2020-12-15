import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Urls } from './consts'
import { HeaderComponent } from './layout/header/HeaderComponent'
import { LoginComponent } from './pages/login/LoginComponent'
import { AuthenticatedPages } from './pages/AuthenticatedPages'
import { useStyles } from './layout/BackgroundBody.style'
import { SignUpComponent } from './pages/signUp/SignUpComponent'

export const App = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <HeaderComponent />
      <Switch>
        <Route exact path={Urls.Login} component={LoginComponent} />
        <Route exact path={Urls.SignUp} component={SignUpComponent} />
        <Route exact path='*' render={() => (
          <>
            <AuthenticatedPages />
          </>
        )} />
      </Switch>
    </div>
  )
}

App.displayName = 'AppComponent'
