import { createAsyncThunk } from '@reduxjs/toolkit'
import {ListingDetailsSchema} from '@features'
import {ThunkApiConfig} from '@app'
import {
    getLimitListingDetails,
} from '../selectors'
import {ParamsFetchListingDetails} from '../interfaces'
import {INITIAL_VALUE_OFFSET} from '../../constans'



export const fetchInitialListingDetails = createAsyncThunk<ListingDetailsSchema, void, ThunkApiConfig>(
    'listing-details/fetchInitialDetails',
    async (_, thunkAPI) => {
        const {getState, extra} = thunkAPI
        const state = getState()

        const limit = getLimitListingDetails(state)
        const offset = INITIAL_VALUE_OFFSET
        
        const params: ParamsFetchListingDetails = {
            limit, offset
        }


        try {
            const response = await extra.api.get('/api/detail', {
                params
            })

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
