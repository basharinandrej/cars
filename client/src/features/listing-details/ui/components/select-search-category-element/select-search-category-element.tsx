import { SelectSearch} from '@shared'
import { useSelector } from 'react-redux';
import {
    getFilterSelectedCategoryLabel,
    getFilterListingCategories
} from '../../../model/selectors'

import {fetchListingCategories} from '../../../model/async-actions/fetch-listing-categories'
import {fetchInitialListingDetails} from '../../../model/async-actions/fetch-initial-listing-details'

import {
    setSelectedCategory, 
    dropSelectedCategory
} from '../../../model/slices/filter-listing-details-slice'

import {useAppDispatch} from '@shared'


export const SelectSearchCategoryElement = () => {
    const dispatch = useAppDispatch()

    const categoryLabel = useSelector(getFilterSelectedCategoryLabel)
    const categories = useSelector(getFilterListingCategories)

    const onFocusCategoryHandler = () => {
        dispatch(fetchListingCategories())
    }

    const onChangeSelectCategoryHandler = (value: string) => {
        if(value) {
            dispatch(setSelectedCategory(Number(value)))
            dispatch(fetchInitialListingDetails())
        }
    }

    const onClearSelectCategoryHandler = () => {
        dispatch(dropSelectedCategory())
        dispatch(fetchInitialListingDetails())
    }

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
