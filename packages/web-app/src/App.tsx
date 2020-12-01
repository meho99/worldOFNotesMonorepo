import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'

export const App = () => {
  useEffect(() => {
    fetch('.netlify/functions/folder?id=282658353591616005', {
      method: 'GET',
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI4MjY1ODM1MzU5MTYxNjAwNSIsImlhdCI6MTYwNjY3ODI2NSwiZXhwIjoxNjA2NjgxODY1fQ.MR6aWjgWI36J3NBf9JmbLyefwztt6hXLcC0CZ-3crIM'
      }
    })
      .then(data => data.json())
      .then(data => console.log({ data }))

  }, [])

  return (
    <Typography variant='body1'>Test</Typography>
  )
}

App.displayName = 'AppComponent'
