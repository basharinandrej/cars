import {instanceAxios} from '@shared'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {ListingDetailsSchema} from '@features'
import {ThunkApiConfig} from '@app'
import { getSearchFilterListingDetails } from '../selectors'
import {ParamsFetchSearchDetails} from '../interfaces'
import {INITIAL_VALUE_OFFSET} from '../../constans'


const addQueryParams = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams(window.location.search)
    Object.entries(params).forEach(([key, value]) => {
      if(value) {
        searchParams.set(key, value)
      } else {
        searchParams.delete(key)
      }
    })
    window.history.pushState(null, '',`?${searchParams.toString()}`)
}

  
export const fetchSearchDetails = createAsyncThunk<ListingDetailsSchema, void, ThunkApiConfig>(
    'listing-details/fetchSearchDetails',
    async (_, thunkAPI) => {
        const {getState} = thunkAPI
        const state = getState()

        const search =  getSearchFilterListingDetails(state)
        const offset = INITIAL_VALUE_OFFSET

        const params: ParamsFetchSearchDetails = {
            keyword: search
        }

        addQueryParams(params)

        try {
            const response = await instanceAxios.get('/api/detail/search', {
                params: {
                    ...params,
                    offset
                }              
            })

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
