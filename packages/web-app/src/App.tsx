import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Urls } from './consts/urls'

import { HeaderComponent } from './layout/header/HeaderComponent'

import { LoginComponent } from './pages/login/LoginComponent'
import { AuthenticatedPages } from './pages/AuthenticatedPages'

export const App = () => {

  return (
    <>
      <HeaderComponent />
      <Switch>
        <Route exact path={Urls.Login} component={LoginComponent} />
        <Route exact path='*' render={() => (
          <>
            <AuthenticatedPages />
          </>
        )} />
      </Switch>
    </>
  )
}

App.displayName = 'AppComponent'
