import React, {FC, ChangeEventHandler, useCallback} from 'react'
import {InputSearch, useDebounce, useAppDispatch} from '@shared'
import {setSearch} from '../model/slices/filter-listing-details-slice'
import {fetchInitialSearchListingDetails} from '../model/async-actions/fetch-initial-search-listing-details'
import {fetchInitialListingDetails} from '../model/async-actions/fetch-initila-listing-details'
import { SearchProps } from 'antd/es/input';


export const FilterListingDetails: FC<Props> = () => {
    const dispatch = useAppDispatch()

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        dispatch(setSearch(e.target.value))
    }, [dispatch, setSearch])

    const debounceHandlerOnChange = useDebounce(onChangeHandler)

    const onSeacrhHandler: SearchProps['onSearch'] = useCallback((_, __, {source}) => {
        if(source === 'input') dispatch(fetchInitialSearchListingDetails())
        if(source === 'clear') dispatch(fetchInitialListingDetails())
    }, []) 

    return <InputSearch 
        onSearch={onSeacrhHandler} 
        onChange={debounceHandlerOnChange}
    />
}

interface Props {

}