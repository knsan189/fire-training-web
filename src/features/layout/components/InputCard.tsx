import { type ReactNode } from "react"

import { CardContent, Grid, Paper, Stack, Typography } from "@mui/material"

interface Props {
  primary: string
  secondary?: string
  children: ReactNode
  disableStack?: boolean
}

const InputCard = ({ primary, secondary, children, disableStack }: Props) => {
  return (
    <Paper elevation={5}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={3}>
            <Typography variant="subtitle1" gutterBottom>
              {primary}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {secondary}
            </Typography>
          </Grid>
          <Grid size={9}>
            {disableStack ? children : <Stack spacing={3}>{children}</Stack>}
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  )
}

export default InputCard
