import React, {FC, ChangeEventHandler, useCallback} from 'react'
import {InputSearch, useDebounce, useAppDispatch} from '@shared'
import {setSearch} from '../model/slices/filter-listing-details-slice'
import {fetchSearchDetails} from '../../listing-details/model/async-actions/fetch-search-details'


export const FilterListingDetails: FC<Props> = () => {
    const dispatch = useAppDispatch()

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        dispatch(setSearch(e.target.value))
    }, [dispatch, setSearch])

    const debounceHandlerOnChange = useDebounce(onChangeHandler)

    const onSeacrhHandler = useCallback(() => {
        dispatch(fetchSearchDetails())
    }, []) 

    return <InputSearch 
        onSearch={onSeacrhHandler} 
        onChange={debounceHandlerOnChange}
    />
}

interface Props {

}