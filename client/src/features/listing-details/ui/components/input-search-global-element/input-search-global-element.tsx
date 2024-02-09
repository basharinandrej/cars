import React, {ChangeEventHandler, useCallback, FC, ReactNode} from 'react'
import { useSelector } from 'react-redux';
import { SearchProps } from 'antd/es/input';
import {InputSearch, useAppDispatch} from '@shared'


import {setSearchGlobal, dropSearchGlobal} from '../../../model/slices/filter-listing-details-slice'


import {fetchInitialListingDetails} from '../../../model/async-actions/fetch-initial-listing-details'

import { getSearchGlobalFilterListingDetails } from '../../../model/selectors'


export const InputSearchGlobalElement: FC<Props> = ({suffix}) => {
    const dispatch = useAppDispatch()

    const searchGlobal = useSelector(getSearchGlobalFilterListingDetails)


    const onChangeInputSearchHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const value = e.target.value        
        value 
            ? dispatch(setSearchGlobal(value))
            : dispatch(dropSearchGlobal())
    }, [dispatch, setSearchGlobal])

    // const debounceHandlerOnChange = useDebounce(onChangeHandler)

    const onSearchInputSearchHandler: SearchProps['onSearch'] = useCallback((_,__,{source}) => {
        if(source === 'input') dispatch(fetchInitialListingDetails())
        if(source === 'clear') {
            dispatch(dropSearchGlobal())
            dispatch(fetchInitialListingDetails())
        }
    }, []) 

    return (
        <InputSearch 
            onSearch={onSearchInputSearchHandler} 
            onChange={onChangeInputSearchHandler}
            externalValue={searchGlobal}
            suffix={suffix}
        />
    )
}

interface Props {
    suffix?: ReactNode
}