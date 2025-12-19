import { useEffect, useRef, useState } from "react"

export const useMinimumLoading = (active: boolean, minMs = 500) => {
  const [visible, setVisible] = useState<boolean>(active)
  const startRef = useRef<number | null>(active ? Date.now() : null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    // 활성화되면 즉시 표시 + 시작 시각 기록
    if (active) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (!visible) setVisible(true)
      startRef.current ??= Date.now()
      return
    }

    // 비활성화로 전환: 경과 시간 계산 후 남은 시간만큼 더 표시
    const elapsed = startRef.current ? Date.now() - startRef.current : minMs
    const remain = Math.max(minMs - elapsed, 0)

    timeoutRef.current = window.setTimeout(() => {
      setVisible(false)
      startRef.current = null
      timeoutRef.current = null
    }, remain)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return visible
}
