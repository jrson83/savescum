import { useEffect, useLayoutEffect, useState } from 'react'

export type WindowSize = {
  width: number
  height: number
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  const handleResize = () =>
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useLayoutEffect(() => {
    handleResize()
  }, [])

  return windowSize
}
