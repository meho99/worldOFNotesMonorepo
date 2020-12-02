import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { Route, Router } from 'react-router'
import { LoginComponent } from './pages/login/LoginComponent'

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
    <></>
  )
}

App.displayName = 'AppComponent'
