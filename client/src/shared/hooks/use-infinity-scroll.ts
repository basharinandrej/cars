import {MutableRefObject, useEffect} from "react"

interface useObserverIntersectionScroll {
  callback: () => void
  refRootElement: MutableRefObject<HTMLDivElement | null>
  refTargetElement: MutableRefObject<HTMLDivElement | null>
}

export function useInfinityScroll({
   callback,
   refRootElement,
   refTargetElement
}: useObserverIntersectionScroll) {

  useEffect(() => {
    if(!refTargetElement.current) return

    const options = {
      root: refRootElement.current,
      rootMargin: "0px",
      threshold: 1.0
    }

    const observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting) {
        callback()
      }
    }, options)
    observer.observe(refTargetElement.current)

    return () => {
      refTargetElement.current && observer.unobserve(refTargetElement.current)
    }
  }, [refTargetElement, refTargetElement, callback])
}