import React, {FC, ChangeEventHandler, useCallback, useEffect} from 'react'
import { SearchProps } from 'antd/es/input';
import { useSelector } from 'react-redux';
import {InputSearch, addQueryParams, useAppDispatch} from '@shared'
import {setSearch} from '../model/slices/filter-listing-details-slice'
import {fetchInitialSearchListingDetails} from '../model/async-actions/fetch-initial-search-listing-details'
import {fetchInitialListingDetails} from '../model/async-actions/fetch-initila-listing-details'
import {getSearchFilterListingDetails} from '../../listing-details/model/selectors'

export const FilterListingDetails: FC<Props> = () => {
    const dispatch = useAppDispatch()

    const search = useSelector(getSearchFilterListingDetails)

    useEffect(() => {
        search === '' && addQueryParams({keyword: ''})
    }, [search])

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        dispatch(setSearch(e.target.value))
    }, [dispatch, setSearch])

    // const debounceHandlerOnChange = useDebounce(onChangeHandler)

    const onSeacrhHandler: SearchProps['onSearch'] = useCallback((_, __, {source}) => {
        if(source === 'input') dispatch(fetchInitialSearchListingDetails())
        if(source === 'clear') dispatch(fetchInitialListingDetails())
    }, []) 

    return <InputSearch 
        onSearch={onSeacrhHandler} 
        onChange={onChangeHandler}
        externalValue={search}
    />
}

interface Props {

}