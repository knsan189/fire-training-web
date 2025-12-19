import {
  Skeleton,
  Typography,
  type SkeletonProps,
  type TypographyProps,
} from "@mui/material"

interface LoadingTypographyProps extends TypographyProps {
  loading: boolean
  skeletonProps?: SkeletonProps
}

const LoadingTypography = ({
  children,
  loading,
  skeletonProps,
  ...props
}: LoadingTypographyProps) => {
  return (
    <Typography {...props}>
      {loading ? <Skeleton variant="text" {...skeletonProps} /> : children}
    </Typography>
  )
}

export default LoadingTypography
