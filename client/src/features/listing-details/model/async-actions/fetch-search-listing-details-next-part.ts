import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {ListingDetailsSchema} from '@features'
import {
    getLimitListingDetails,
    getOffsetListingDetails,
    getFilterSelectedModelValue,
    getSearchGlobalFilterListingDetails
} from '../selectors'
import {ParamsFetchListingDetails} from '../interfaces'


export const fetchSearchListingDetailsNextPart = createAsyncThunk<ListingDetailsSchema, void, ThunkApiConfig>(
    'listing-details/fetchSearchDetailsNextPart',
    async (_, thunkAPI) => {
        const {getState, extra} = thunkAPI
        const state = getState()

        const limit = getLimitListingDetails(state)
        const offset = getOffsetListingDetails(state)
        const searchGlobal = getSearchGlobalFilterListingDetails(state)
        const valueSelectedModel = getFilterSelectedModelValue(state)

        const params: ParamsFetchListingDetails = {
            limit,
            offset,
        }
        if(searchGlobal) params.keyword = searchGlobal
        if(valueSelectedModel) params.modelId = valueSelectedModel

        try {

            const response = await extra.api.get('/api/detail/search', {
                params
            })

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
