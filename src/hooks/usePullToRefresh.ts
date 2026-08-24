import { useState, useRef, useCallback } from 'react'

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void>
  threshold?: number
  scrollContainerRef?: { readonly current: HTMLDivElement | null }
}

export function usePullToRefresh({ onRefresh, threshold = 80, scrollContainerRef }: UsePullToRefreshOptions) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const startY = useRef<number | null>(null)
  const isPulling = useRef(false)

  const getScrollTop = useCallback(() => {
    const container = scrollContainerRef?.current
    return container ? container.scrollTop : window.scrollY
  }, [scrollContainerRef])

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (getScrollTop() > 0) return
    startY.current = e.touches[0].clientY
    isPulling.current = true
  }, [getScrollTop])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling.current || startY.current === null) return

    if (getScrollTop() > 0) {
      isPulling.current = false
      setPullDistance(0)
      return
    }

    const delta = e.touches[0].clientY - startY.current
    if (delta <= 0) return

    const distance = Math.min(delta * 0.5, threshold * 1.5)
    setPullDistance(distance)
    setIsReady(distance >= threshold)

    if (delta > 20 && getScrollTop() === 0) {
      e.preventDefault()
    }
  }, [threshold, getScrollTop])

  const onTouchEnd = useCallback(async () => {
    if (!isPulling.current) return
    isPulling.current = false
    startY.current = null

    if (pullDistance >= threshold) {
      setIsRefreshing(true)
      setPullDistance(0)
      setIsReady(false)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    } else {
      setPullDistance(0)
      setIsReady(false)
    }
  }, [pullDistance, threshold, onRefresh])

  return {
    pullDistance,
    isRefreshing,
    isReady,
    handlers: { onTouchStart, onTouchMove, onTouchEnd },
  }
}
