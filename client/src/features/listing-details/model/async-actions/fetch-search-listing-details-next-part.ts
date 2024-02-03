import {instanceAxios} from '@shared'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {ListingDetailsSchema} from '@features'
import {
    getLimitListingDetails,
    getOffsetListingDetails,
    getCategoryIdListingDetails,
    getModelIdListingDetails,
    getSearchFilterListingDetails
} from '../selectors'
import {ParamsFetchListingDetails} from '../interfaces'


export const fetchSearchListingDetailsNextPart = createAsyncThunk<ListingDetailsSchema, void, ThunkApiConfig>(
    'listing-details/fetchSearchDetailsNextPart',
    async (_, thunkAPI) => {
        const {getState} = thunkAPI
        const state = getState()

        const limit = getLimitListingDetails(state)
        const offset = getOffsetListingDetails(state)
        const categoryId = getCategoryIdListingDetails(state)
        const modelId = getModelIdListingDetails(state)
        const search = getSearchFilterListingDetails(state)

        const params: ParamsFetchListingDetails = {
            limit,
            offset,
        }
        if(categoryId) params.categoryId = categoryId
        if(modelId) params.modelId = modelId
        if(search) params.keyword = search

        try {

            const response = await instanceAxios.get('/api/detail/search', {
                params
            })

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
