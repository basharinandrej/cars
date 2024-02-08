import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {ListingDetailsSchema} from '@features'
import {
    getLimitListingDetails,
    getOffsetListingDetails,
    getFilterSelectedModelValue,
    getFilterSelectedCategoryValue,
    getSearchGlobalFilterListingDetails
} from '../selectors'
import {ParamsFetchListingDetails} from '../interfaces'
import {addQueryParams} from '@shared'


export const fetchListingDetailsNextPart = createAsyncThunk<ListingDetailsSchema, void, ThunkApiConfig>(
    'listing-details/fetchDetailsNextPart',
    async (_, thunkAPI) => {
        const {getState, extra} = thunkAPI
        const state = getState()

        const searchGlobal = getSearchGlobalFilterListingDetails(state)
        const limit = getLimitListingDetails(state)
        const offset = getOffsetListingDetails(state)
        const valueSelectedModel = getFilterSelectedModelValue(state)
        const detailCategoryId = getFilterSelectedCategoryValue(state)

        const params: ParamsFetchListingDetails = {
            limit,
            offset,
        }

        if(searchGlobal) params.keyword = searchGlobal
        if(valueSelectedModel) params.modelId = valueSelectedModel
        if(detailCategoryId) params.detailCategoryId = detailCategoryId

        addQueryParams('keyword', params.keyword)
        addQueryParams('modelId', params.modelId)
        addQueryParams('detailCategoryId', params.detailCategoryId)

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
