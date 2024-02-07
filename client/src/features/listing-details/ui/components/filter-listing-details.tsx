import React, {FC, ChangeEventHandler, useCallback, useEffect} from 'react'
import { SearchProps } from 'antd/es/input';
import { useSelector } from 'react-redux';
import {InputSearch, useAppDispatch, SelectSearch} from '@shared'
import {
    initFilters,
    setSearchGlobal, 
    dropSearchGlobal, 
    setSelectedBrand,
    setSelectedModel,
    dropSelectedModel,
    dropSelectedBrand
} from '../../model/slices/filter-listing-details-slice'

import {fetchListingBrands} from '../../model/async-actions/fetch-listing-brands'
import {fetchListingModels} from '../../model/async-actions/fetch-listing-models'
import {fetchInitialListingDetails} from '../../model/async-actions/fetch-initial-listing-details'
import {fetchByIdBrand} from '../../model/async-actions/fetch-by-id-brand'

import {
    getSearchGlobalFilterListingDetails, 
    getFilterListingModels,
    getFilterListingBrands,
    getFilterSelectedModelLabel,
    getFilterSelectedModelValue,
    getFilterSelectedBrandValue,
    getFilterSelectedBrandLabel
} from '../../model/selectors'

import styles from './filter-listing-details.module.sass'




export const FilterListingDetails: FC<Props> = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initFilters())
    }, [])


    const searchGlobal = useSelector(getSearchGlobalFilterListingDetails)
    const brands = useSelector(getFilterListingBrands)
    const models = useSelector(getFilterListingModels)
    
    const modelLabel = useSelector(getFilterSelectedModelLabel)
    const modelValue = useSelector(getFilterSelectedModelValue)

    const brandLabel = useSelector(getFilterSelectedBrandLabel)
    const brandValue = useSelector(getFilterSelectedBrandValue)

    useEffect(() => {
        if(brandValue && !brandLabel) {
            dispatch(fetchByIdBrand(brandValue))
        }
    }, [modelValue, brandValue])

    const onChangeInputSearchHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const value = e.target.value        
        value 
            ? dispatch(setSearchGlobal(value))
            : dispatch(dropSearchGlobal())
    }, [dispatch, setSearchGlobal])

    // const debounceHandlerOnChange = useDebounce(onChangeHandler)

    const onSearchInputSearchHandler: SearchProps['onSearch'] = useCallback(() => {
        dispatch(fetchInitialListingDetails())
    }, []) 


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


    const onFocusModelHandler = () => {
        dispatch(fetchListingModels())
    };
    const onChangeSelectModelHandler = (value: string) => {
        value && dispatch(setSelectedModel(Number(value)))
        dispatch(fetchInitialListingDetails())
    };
    const onClearSelectModelHandler = () => {
        dispatch(dropSelectedModel())
    }

    return <div className={styles.filterWrapper}>
        <div className={styles.inputSearch}>
            <InputSearch 
                onSearch={onSearchInputSearchHandler} 
                onChange={onChangeInputSearchHandler}
                externalValue={searchGlobal}
            />
        </div>

        <div className={styles.boxSelects}>
            <div className={styles.selectSearchBrand}>
                <SelectSearch
                    placeholder={'Выбирите бренд'}
                    onSearch={onSearchSelectBrandHandler}
                    onChange={onChangeSelectBrandHandler}
                    onClear={onClearSelectBrandHandler}
                    options={brands}
                    value={brandLabel}
                />
            </div>

            <div className={styles.selectSearchModel}>
                <SelectSearch
                    placeholder={'Выбирите модель'}
                    onFocus={onFocusModelHandler}
                    onChange={onChangeSelectModelHandler}
                    onClear={onClearSelectModelHandler}
                    options={models}
                    value={modelLabel}
                />
            </div>
        </div>
    </div>
}

interface Props {

}