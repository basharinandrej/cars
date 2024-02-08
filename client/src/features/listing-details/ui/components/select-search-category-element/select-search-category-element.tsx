import { SelectSearch} from '@shared'
import { useSelector } from 'react-redux';

import {
    getFilterSelectedCategoryLabel,
    getFilterListingCategories,
    getFilterSelectedCategoryValue
} from '../../../model/selectors'

import {fetchListingCategories} from '../../../model/async-actions/fetch-listing-categories'
import {fetchInitialListingDetails} from '../../../model/async-actions/fetch-initial-listing-details'

import {
    setSelectedCategory, 
    dropSelectedCategory
} from '../../../model/slices/filter-listing-details-slice'

import {useAppDispatch} from '@shared'
import { useCallback, useEffect } from 'react';


export const SelectSearchCategoryElement = () => {
    const dispatch = useAppDispatch()

    const categoryLabel = useSelector(getFilterSelectedCategoryLabel)
    const categoryValue = useSelector(getFilterSelectedCategoryValue)
    const categories = useSelector(getFilterListingCategories)

    useEffect(() => {
        if(categoryValue && !categoryLabel) {
            dispatch(fetchListingCategories())
        }
    }, [categoryValue])

    const onFocusCategoryHandler = useCallback(() => {
        dispatch(fetchListingCategories())
    }, [dispatch, fetchListingCategories])

    const onChangeSelectCategoryHandler = useCallback((value: string) => {
        if(value) {
            dispatch(setSelectedCategory(Number(value)))
            dispatch(fetchInitialListingDetails())
        }
    }, [dispatch, fetchInitialListingDetails, setSelectedCategory])

    const onClearSelectCategoryHandler = useCallback(() => {
        dispatch(dropSelectedCategory())
        dispatch(fetchInitialListingDetails())
    }, [dispatch, dropSelectedCategory, fetchInitialListingDetails])

    return (
        <SelectSearch
            placeholder={'Категория'}
            onFocus={onFocusCategoryHandler}
            onChange={onChangeSelectCategoryHandler}
            onClear={onClearSelectCategoryHandler}
            options={categories}
            value={categoryLabel}
        />
    )
}
