import {FC} from 'react'
import { useAppDispatch, useMount} from '@shared'
import {fetchCarUser} from '../model/async-actions/fetch-cars-user'


export const Garage:FC<Props> = ({
    id
}) => {
    const dispatch = useAppDispatch()

    useMount(() => {
        dispatch(fetchCarUser())
    })

    return (
        <h1>garage {id}</h1>
    )
}

interface Props {
    id: string
}