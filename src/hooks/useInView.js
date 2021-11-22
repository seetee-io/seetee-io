import { useEffect, useState } from 'react'

const useInView = (elementRef) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const callback = (entries) => {
      entries.map((entry) => setIsVisible(entry.isIntersecting))
    }

    const options = {
      threshold: new Array(101).fill(0).map((v, i) => i * 0.01),
    }

    let observer = new IntersectionObserver(callback, options)
    const currentElement = elementRef.current

    observer.observe(currentElement)

    return () => {
      observer.disconnect()
    }
  }, [elementRef])

  return isVisible
}

export default useInView
