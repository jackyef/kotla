import { Grid } from '@geist-ui/core'
import type { FC } from 'react'

export const Layout: FC = ({ children }) => {
  return (
    <Grid.Container gap={2}>
      <Grid xs={0} sm={4} />
      <Grid xs={24} sm={16}>
        {children}
      </Grid>
      <Grid xs={0} sm={4} />
    </Grid.Container>
  )
}
