import type { ReactNode } from "react"
import {
  Box,
  Breadcrumbs,
  Link,
  Stack,
  type SxProps,
  Typography,
} from "@mui/material"

export interface BreadcrumbItem {
  label: string | ReactNode
  href?: string
}

interface ContentHeaderProps {
  title: string | ReactNode
  action?: ReactNode
  breadcrumbs: BreadcrumbItem[]
  sx?: SxProps
}

const ContentHeader = ({
  title,
  breadcrumbs,
  action,
  sx,
}: ContentHeaderProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={sx}
    >
      <Box>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Breadcrumbs>
          {breadcrumbs.map(item =>
            item.label && item.href ? (
              <Link key={item.href} href={item.href} color="textPrimary">
                {item.label}
              </Link>
            ) : (
              <Typography key={item.label as string}>{item.label}</Typography>
            ),
          )}
        </Breadcrumbs>
      </Box>
      {action && (
        <Stack direction="row" spacing={2}>
          {action}
        </Stack>
      )}
    </Box>
  )
}

export default ContentHeader
