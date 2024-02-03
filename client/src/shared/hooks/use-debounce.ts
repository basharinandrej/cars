import {useRef} from "react";

export const useDebounce = (cb: (...args: any[]) => void, delay = 500) => {
  const ref = useRef<ReturnType<typeof setTimeout>>(null)

  return (...args: any[]) => {
    if(ref.current) {
      clearTimeout(ref.current)
    }

    ref.current = setTimeout(() => cb(...args), delay)
  }
}