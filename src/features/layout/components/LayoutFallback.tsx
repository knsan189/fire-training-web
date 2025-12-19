import { Box, Breadcrumbs, Skeleton, Typography } from "@mui/material"
import Layout from "./Layout"

const LayoutFallback = () => {
  return (
    <Layout>
      <Box>
        <Typography variant="h4" gutterBottom>
          <Skeleton variant="text" width={200} />
        </Typography>
        <Breadcrumbs>
          <Skeleton variant="text" width={50} />
          <Skeleton variant="text" width={100} />
        </Breadcrumbs>
      </Box>
    </Layout>
  )
}

export default LayoutFallback
