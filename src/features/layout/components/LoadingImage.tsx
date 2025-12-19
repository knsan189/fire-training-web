import { Skeleton } from "@mui/material"
import { useEffect, useState } from "react"

interface LoadingImageProps {
  width?: number | string
  height?: number | string
  src: string | undefined
  alt: string
  isLoading: boolean
}

const LoadingImage = ({
  src,
  alt,
  isLoading,
  width = "100%",
  height = "100%",
}: LoadingImageProps) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!src) return
    const img = new Image()
    img.src = src
    img.onload = () => {
      setLoaded(true)
    }
    return () => {
      img.src = ""
      setLoaded(false)
    }
  }, [src])

  return (
    <>
      {isLoading || !loaded ? (
        <Skeleton variant="rectangular" width={width} height={height} />
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ verticalAlign: "middle", objectFit: "cover" }}
          loading="lazy"
        />
      )}
    </>
  )
}

export default LoadingImage
