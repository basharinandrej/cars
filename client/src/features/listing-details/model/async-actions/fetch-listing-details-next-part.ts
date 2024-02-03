import {instanceAxios} from '@shared'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {ListingDetailsSchema} from '@features'
import {
    getLimitListingDetails,
    getOffsetListingDetails,
    getCategoryIdListingDetails,
    getModelIdListingDetails
} from '../selectors'
import {ParamsFetchListingDetails} from '../interfaces'


export const fetchListingDetailsNextPart = createAsyncThunk<ListingDetailsSchema, void, ThunkApiConfig>(
    'listing-details/fetchDetailsNextPart',
    async (_, thunkAPI) => {
        const {getState} = thunkAPI
        const state = getState()

        const limit = getLimitListingDetails(state)
        const offset = getOffsetListingDetails(state)
        const categoryId = getCategoryIdListingDetails(state)
        const modelId = getModelIdListingDetails(state)

        const params: ParamsFetchListingDetails = {
            limit,
            offset,
        }
        if(categoryId) params.categoryId = categoryId
        if(modelId) params.modelId = modelId

        try {

            const response = await instanceAxios.get('/api/detail', {
                params
            })

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
