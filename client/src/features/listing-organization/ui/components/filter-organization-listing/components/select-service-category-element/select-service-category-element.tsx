import {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {Select, useAppDispatch} from '@shared'

import {fetchListingServiceCategories} from '../../../../../model/async-actions/fetch-listing-service-categories'
import {fetchInitialListingOrganizations} from '../../../../../model/async-actions/fetch-initial-listing-organizations'
import {
    setSelectedServiceCategory,
    dropSelectedServiceCategory
} from '../../../../../model/slices/filter-listing-organization-slice'

import {
    getFilterListingServiceCategories, 
    getFilterSelectedServiceCategoryLabel
} from '../../../../../model/selectors'


export const SelectServiceCategoryElement = () => {
    const dispatch = useAppDispatch()

    const options = useSelector(getFilterListingServiceCategories)
    const label = useSelector(getFilterSelectedServiceCategoryLabel)

    const onFocusCategoryHandler = useCallback(() => {
        dispatch(fetchListingServiceCategories())
    }, [dispatch, fetchListingServiceCategories])

    const onChangeSelectCategoryHandler = useCallback((value: string) => {
        if(value) {
            dispatch(setSelectedServiceCategory(Number(value)))
            dispatch(fetchInitialListingOrganizations())
        }
    }, [dispatch, fetchInitialListingOrganizations, setSelectedServiceCategory])

    const onClearSelectCategoryHandler = useCallback(() => {
        dispatch(dropSelectedServiceCategory())
        dispatch(fetchInitialListingOrganizations())
    }, [dispatch, dropSelectedServiceCategory, fetchInitialListingOrganizations])

    return (
        <Select
            onChange={onChangeSelectCategoryHandler}
            onFocus={onFocusCategoryHandler}
            onClear={onClearSelectCategoryHandler}
            options={options}
            value={label}
            placeholder='Категория услуги'
        />
    )
}