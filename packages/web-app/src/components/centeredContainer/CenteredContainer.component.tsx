import React from 'react'

import { useStyles } from './CenteredContainer.styles'

export const CenteredContainer: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {children}
      </div>
    </div>
  )
}
