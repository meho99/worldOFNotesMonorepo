import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

type LinkComponentProps = Pick<LinkProps, 'to'>

export const LinkComponent: React.FC<LinkComponentProps> = ({ children, to }) => {
  return (
    <MuiLink to={to} component={Link} sx={{ mt: 2 }}>
      <Typography color='textPrimary'> {children} </Typography>
    </MuiLink>
  )
}
