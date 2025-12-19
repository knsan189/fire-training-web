import { Box, Skeleton } from "@mui/material"

const BAR_COUNT = 25
const BAR_MAX_HEIGHT = 160
const BAR_MIN_HEIGHT = 60

const getRandomHeight = () => {
  return (
    Math.floor(Math.random() * (BAR_MAX_HEIGHT - BAR_MIN_HEIGHT)) +
    BAR_MIN_HEIGHT
  )
}

const BarChartSkeleton = () => {
  return (
    <Box
      display="flex"
      alignItems="end"
      justifyContent="space-between"
      height={300}
      bgcolor="#f5f5f5"
      borderRadius={2}
      p={3}
    >
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <Skeleton
          key={i}
          variant="rectangular"
          width={28}
          height={getRandomHeight()}
          sx={{
            borderRadius: "8px",
            bgcolor: "#e0e0e0",
            mb: 1,
          }}
        />
      ))}
    </Box>
  )
}

export default BarChartSkeleton
