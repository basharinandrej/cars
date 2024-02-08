import {Button, useAppDispatch} from '@shared'


import {dropFilters} from '../../../model/slices/filter-listing-details-slice'

import {fetchInitialListingDetails} from '../../../model/async-actions/fetch-initial-listing-details'
import { useCallback } from 'react'

export const ButtonResetFilter = () => {
    const dispatch = useAppDispatch()


    const onClickHandler = useCallback(() => {
        dispatch(dropFilters())
        dispatch(fetchInitialListingDetails())
    }, [dropFilters, dispatch])

    return <Button 
        onClick={onClickHandler}
        text='Сбросить фильтр'
    />
}