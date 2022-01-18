import React from 'react'
import Typography from '@mui/material/Typography'
import { Link, LinkProps } from 'react-router-dom'

import { useStyles } from './Link.styles'

type LinkComponentProps = Pick<LinkProps, 'to'>

export const LinkComponent: React.FC<LinkComponentProps> = ({ children, to }) => {
  const classes = useStyles()

  return (
    <Link to={to} className={classes.link}>
      <Typography color='textPrimary'> {children} </Typography>
    </Link>
  )
}
