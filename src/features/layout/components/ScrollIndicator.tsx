import { debounce, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useEffect, useMemo, useState } from "react"

interface ScrollIndicatorProps {
  items: { id: string; label: string }[]
}

const ScrollIndicator = ({ items }: ScrollIndicatorProps) => {
  const [top, setTop] = useState(40)

  const delaySetTop = useMemo(() => debounce(setTop, 80), [])

  useEffect(() => {
    const handleScroll = () => {
      delaySetTop(window.scrollY + 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [delaySetTop])

  const handleClickScroll = (_event: unknown, id: string) => {
    const element = document.getElementById(id)
    if (!element) return
    const elementTop = element.getBoundingClientRect().top
    window.scrollTo({
      top: window.scrollY + elementTop - 64 - 48,
      behavior: "smooth",
    })
  }

  return (
    <Stack
      position="absolute"
      left="calc(100% + 16px)"
      top={top}
      spacing={1}
      width={120}
      zIndex={1}
      sx={{ transition: "ease-in-out 0.4s" }}
    >
      <ToggleButtonGroup
        orientation="vertical"
        exclusive
        onChange={handleClickScroll}
      >
        {items.map(({ id, label }) => (
          <ToggleButton key={id} value={id}>
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  )
}

export default ScrollIndicator
