import {Button, useAppDispatch} from '@shared'
import { useCallback } from 'react'


import {dropFilters} from '../../../../../model/slices/filter-listing-organization-slice'

import {fetchInitialListingOrganizations} from '../../../../../model/async-actions/fetch-initial-listing-organizations'

export const ButtonResetFilter = () => {
    const dispatch = useAppDispatch()


    const onClickHandler = useCallback(() => {
        dispatch(dropFilters())
        dispatch(fetchInitialListingOrganizations())
    }, [dropFilters, dispatch, fetchInitialListingOrganizations])

    return <Button 
        onClick={onClickHandler}
        text='Сбросить фильтр'
    />
}