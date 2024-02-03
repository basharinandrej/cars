import React, {FC, ChangeEventHandler, useCallback} from 'react'
import {InputSearch, useDebounce, useAppDispatch} from '@shared'
import {setSearch} from '../model/slices/filter-listing-details-slice'
import {fetchSearchDetails} from '../model/async-actions/fetch-search-details'
import {fetchListingDetails} from '../model/async-actions/fetch-listing-details'
import { SearchProps } from 'antd/es/input';


export const FilterListingDetails: FC<Props> = () => {
    const dispatch = useAppDispatch()

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        dispatch(setSearch(e.target.value))
    }, [dispatch, setSearch])

    const debounceHandlerOnChange = useDebounce(onChangeHandler)

    const onSeacrhHandler: SearchProps['onSearch'] = useCallback((_, __, {source}) => {
        if(source === 'input') dispatch(fetchSearchDetails())
        if(source === 'clear') dispatch(fetchListingDetails())
    }, []) 

    return <InputSearch 
        onSearch={onSeacrhHandler} 
        onChange={debounceHandlerOnChange}
    />
}

interface Props {

}