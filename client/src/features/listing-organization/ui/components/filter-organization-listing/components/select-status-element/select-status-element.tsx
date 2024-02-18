import {Select, StatusOrganization, useAppDispatch, useMount, getIsMobile, getIsTablet} from '@shared'
import {useSelector} from 'react-redux'


import {
    getStatusFilterListingOrganization, 
    getOptionsFilterListingOrganization
} from '../../../../../model/selectors'

import {
    setStatusOrganization,
    dropStatusOrganization,
} from '../../../../../model/slices/filter-listing-organization-slice'

import {fetchInitialListingOrganizations} from '../../../../../model/async-actions/fetch-initial-listing-organizations'

export const SelectStatusElement = () => {
    const dispatch = useAppDispatch()

    const status = useSelector(getStatusFilterListingOrganization)
    const options = useSelector(getOptionsFilterListingOrganization)

    const onChangeHandler = (value: StatusOrganization) => {
        value && dispatch(setStatusOrganization(value))
        dispatch(fetchInitialListingOrganizations())
    }
    const onClearHandler = () => {
        dispatch(dropStatusOrganization())
    }

    return (
        <Select
            onChange={onChangeHandler}
            onClear={onClearHandler}
            options={options}
            value={status}
            placeholder='Выбрать свободный сервис'
        />
    )
}