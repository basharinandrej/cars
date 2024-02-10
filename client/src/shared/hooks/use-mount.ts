import {useEffect} from 'react'

export const useMount = (cb: VoidFunction) => {

    useEffect(() => {
        cb()
    }, [])
}