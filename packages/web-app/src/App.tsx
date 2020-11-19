import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'

export const App = () => {
  useEffect(() => {
    fetch('http://localhost:9000/signUp', {
      method: 'POST',
      body: JSON.stringify({
        email: 'pies2@test.test',
        password: 'password123',
        name: 'Teest'
      })
    })
      .then(data => data.json())
      .then(data => console.log({ data }))

  }, [])

  return (
    <Typography variant='body1'>Test</Typography>
  )
}
App.displayName = 'AppComponent'
