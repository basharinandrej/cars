import React, {FC, ChangeEventHandler, useCallback} from 'react'
import { SearchProps } from 'antd/es/input';
import { useSelector } from 'react-redux';
import {InputSearch, useAppDispatch, SelectSearch} from '@shared'
import {
    setSearchGlobal, 
    dropSearchGlobal, 
    setSelectedBrand,
    setSelectedModel,
    dropSelectedModel,
    dropSelectedBrand
} from '../../model/slices/filter-listing-details-slice'

import {fetchInitialSearchListingDetails} from '../../model/async-actions/fetch-initial-search-listing-details'
import {fetchInitialListingDetails} from '../../model/async-actions/fetch-initial-listing-details'
import {fetchListingBrands} from '../../model/async-actions/fetch-listing-brands'
import {fetchListingModels} from '../../model/async-actions/fetch-listing-models'

import {
    getSearchFilterListingDetails, 
    getFilterListingModels,
    getFilterListingBrands
} from '../../model/selectors'

import styles from './filter-listing-details.module.sass'




export const FilterListingDetails: FC<Props> = () => {
    const dispatch = useAppDispatch()

    const search = useSelector(getSearchFilterListingDetails)
    const brands = useSelector(getFilterListingBrands)
    const models = useSelector(getFilterListingModels)

    const onChangeInputSearchHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const value = e.target.value        
        value 
            ? dispatch(setSearchGlobal(value))
            : dispatch(dropSearchGlobal())
    }, [dispatch, setSearchGlobal])

    // const debounceHandlerOnChange = useDebounce(onChangeHandler)

    const onSeacrhInputSearchHandler: SearchProps['onSearch'] = useCallback((_, __, {source}) => {
        if(source === 'input') dispatch(fetchInitialSearchListingDetails())
        if(source === 'clear') dispatch(fetchInitialListingDetails())
    }, []) 


    const onChangeSelectBrandHandler = (value: string) => {
        value && dispatch(setSelectedBrand(Number(value)))
    };
    const onSearchSelectBrandHandler = (value: string) => {
        dispatch(fetchListingBrands(value))
    };
    const onClearSelectSearchBrand = () => {
        dispatch(dropSelectedBrand())
    }


    const onFocusModelHandler = () => {
        dispatch(fetchListingModels())
    };
    const onChangeSelectModelHandler = (value: string) => {
        value && dispatch(setSelectedModel(Number(value)))
    };
    const onClearSelectSearchModel = () => {
        dispatch(dropSelectedModel())
    }

    return <div className={styles.filterWrapper}>
        <div className={styles.inputSearch}>
            <InputSearch 
                onSearch={onSeacrhInputSearchHandler} 
                onChange={onChangeInputSearchHandler}
                externalValue={search}
            />
        </div>

        <div className={styles.boxSelects}>
            <div className={styles.selectSearchBrand}>
                <SelectSearch
                    placeholder={'Выбирите бренд'}
                    onSearch={onSearchSelectBrandHandler}
                    onChange={onChangeSelectBrandHandler}
                    onClear={onClearSelectSearchBrand}
                    options={brands}
                />
            </div>

            <div className={styles.selectSearchModel}>
                <SelectSearch
                    placeholder={'Выбирите модель'}
                    onFocus={onFocusModelHandler}
                    onChange={onChangeSelectModelHandler}
                    onClear={onClearSelectSearchModel}
                    options={models}
                />
            </div>
        </div>
    </div>
}

interface Props {

}