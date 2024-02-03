import React, {FC, ChangeEventHandler, useCallback, useEffect} from 'react'
import { SearchProps } from 'antd/es/input';
import { useSelector } from 'react-redux';
import {InputSearch, addQueryParams, useAppDispatch, SelectSearch} from '@shared'
import {setSearch} from '../model/slices/filter-listing-details-slice'

import {fetchInitialSearchListingDetails} from '../model/async-actions/fetch-initial-search-listing-details'
import {fetchInitialListingDetails} from '../model/async-actions/fetch-initial-listing-details'
import {fetchListingBrands} from '../model/async-actions/fetch-listing-brands'

import {getSearchFilterListingDetails, getFilterListingBrands} from '../model/selectors'

export const FilterListingDetails: FC<Props> = () => {
    const dispatch = useAppDispatch()

    const search = useSelector(getSearchFilterListingDetails)
    const brands = useSelector(getFilterListingBrands)

    useEffect(() => {
        search === '' && addQueryParams({keyword: ''})
    }, [search])

    const onChangeInputSearchHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        dispatch(setSearch(e.target.value))
    }, [dispatch, setSearch])

    // const debounceHandlerOnChange = useDebounce(onChangeHandler)

    const onSeacrhInputSearchHandler: SearchProps['onSearch'] = useCallback((_, __, {source}) => {
        if(source === 'input') dispatch(fetchInitialSearchListingDetails())
        if(source === 'clear') dispatch(fetchInitialListingDetails())
    }, []) 


    const onChangeSelectHandler = (value: string) => {
        console.log(`selected ${value}`);
    };
      
    const onSearchSelectHandler = (value: string) => {
        console.log('search:', value);
        dispatch(fetchListingBrands())
    };

    return <>
        <SelectSearch
            onSearch={onSearchSelectHandler}
            onChange={onChangeSelectHandler}
            options={brands}
        />
        <InputSearch 
            onSearch={onSeacrhInputSearchHandler} 
            onChange={onChangeInputSearchHandler}
            externalValue={search}
        />
    </>
}

interface Props {

}