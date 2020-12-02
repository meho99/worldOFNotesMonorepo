import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { LoginComponent } from './pages/login/LoginComponent'
import { HeaderComponent } from './layout/header/HeaderComponent'

export const App = () => {
  useEffect(() => {
    fetch('.netlify/functions/folder?id=282658353591616005', {
      method: 'GET',
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI4MjY1ODM1MzU5MTYxNjAwNSIsImlhdCI6MTYwNjkwOTk2MywiZXhwIjoxNjA2OTEzNTYzfQ.0uDY7VVxzxdpuYJcYLOvx0aFffcOHo_OoOY6KyZgMbE'
      }
    })
      .then(data => data.json())
      .then(data => console.log({ data }))

  }, [])

  return (
    <>
      <HeaderComponent />
      <Switch>
        <Route exact path='/login' component={LoginComponent} />
      </Switch>
    </>
  )
}

App.displayName = 'AppComponent'
