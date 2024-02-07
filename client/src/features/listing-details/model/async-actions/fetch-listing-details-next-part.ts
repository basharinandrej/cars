import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {ListingDetailsSchema} from '@features'
import {
    getLimitListingDetails,
    getOffsetListingDetails,
    getFilterSelectedModelValue
} from '../selectors'
import {ParamsFetchListingDetails} from '../interfaces'


export const fetchListingDetailsNextPart = createAsyncThunk<ListingDetailsSchema, void, ThunkApiConfig>(
    'listing-details/fetchDetailsNextPart',
    async (_, thunkAPI) => {
        const {getState, extra} = thunkAPI
        const state = getState()

        const limit = getLimitListingDetails(state)
        const offset = getOffsetListingDetails(state)
        const valueSelectedModel = getFilterSelectedModelValue(state)

        const params: ParamsFetchListingDetails = {
            limit,
            offset,
        }

        if(valueSelectedModel) {
            params.modelId = valueSelectedModel
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
