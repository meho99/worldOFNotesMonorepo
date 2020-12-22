import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Link, LinkProps } from 'react-router-dom'

import { useStyles } from './Link.styles'

type LinkComponentProps = Pick<LinkProps, 'to'>

export const LinkComponent: React.FC<LinkComponentProps> = ({ children, to }) => {
  const classes = useStyles()

  return (
    <Link to={to}>
      <Typography className={classes.link} color='textPrimary'> {children} </Typography>
    </Link>
  )
}
