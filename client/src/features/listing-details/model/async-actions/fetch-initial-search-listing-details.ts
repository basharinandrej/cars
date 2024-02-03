import {instanceAxios, addQueryParams} from '@shared'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {ListingDetailsSchema} from '@features'
import {ThunkApiConfig} from '@app'
import { 
    getSearchFilterListingDetails,
    getLimitListingDetails
} from '../selectors'
import {ParamsFetchSearchDetails} from '../interfaces'
import {INITIAL_VALUE_OFFSET} from '../../constans'


  
export const fetchInitialSearchListingDetails = createAsyncThunk<ListingDetailsSchema, void, ThunkApiConfig>(
    'listing-details/fetchSearchInitialDetails',
    async (_, thunkAPI) => {
        const {getState} = thunkAPI
        const state = getState()

        const search =  getSearchFilterListingDetails(state)
        const limit =  getLimitListingDetails(state)
        const offset = INITIAL_VALUE_OFFSET

        const params: ParamsFetchSearchDetails = {
            keyword: search
        }

        addQueryParams(params)

        try {
            const response = await instanceAxios.get('/api/detail/search', {
                params: {
                    ...params,
                    offset,
                    limit
                }              
            })

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
