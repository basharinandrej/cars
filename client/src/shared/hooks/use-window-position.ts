import React, { useLayoutEffect, useState } from 'react';
import {useDebounce} from './use-debounce'

export function useWindowPosition() {
    const [scrollPosition, setScrollPosition] = useState(0);

    const debouncedUpdatePosition = useDebounce(() => {
      setScrollPosition(window.scrollY);
    })

    useLayoutEffect(() => {
      window.addEventListener('scroll', debouncedUpdatePosition);

      return () => window.removeEventListener('scroll', debouncedUpdatePosition);
    }, []);
    return scrollPosition;
  }