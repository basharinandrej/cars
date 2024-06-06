import {useAppDispatch, SelectSearch} from '@shared'
import { useSelector } from 'react-redux';


import {
    setSelectedBrand,
    dropSelectedModel,
    dropSelectedBrand
} from '../../../model/slices/filter-listing-details-slice'


import {fetchInitialListingDetails} from '../../../model/async-actions/fetch-initial-listing-details'
import { fetchListingBrands } from '../../../model/async-actions/fetch-listing-brands';


import { 
    getFilterListingBrands,
    getFilterSelectedBrandLabel
} from '../../../model/selectors'



export const SelectSearchBrandElement = () => {
    const dispatch = useAppDispatch()

    const brands = useSelector(getFilterListingBrands)
    const brandLabel = useSelector(getFilterSelectedBrandLabel)


    const onFocusModelHandler = () => {
        dispatch(fetchListingBrands('a'))
    };
    const onSearchSelectBrandHandler = (value: string) => {
        dispatch(fetchListingBrands(value))
    };
    const onChangeSelectBrandHandler = (value: string) => {
        value && dispatch(setSelectedBrand(Number(value)))
        dispatch(dropSelectedModel())
    };
    const onClearSelectBrandHandler = () => {
        dispatch(dropSelectedBrand())
        dispatch(dropSelectedModel())
        dispatch(fetchInitialListingDetails())
    }

    return (
        <SelectSearch
            placeholder={'Выбирите бренд'}
            onFocus={onFocusModelHandler}
            onSearch={onSearchSelectBrandHandler}
            onChange={onChangeSelectBrandHandler}
            onClear={onClearSelectBrandHandler}
            options={brands}
            value={brandLabel}
        />
    )
}