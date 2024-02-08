import { createAsyncThunk } from '@reduxjs/toolkit'
import {ListingDetailsSchema} from '@features'
import {ThunkApiConfig} from '@app'
import {
    getLimitListingDetails,
    getFilterSelectedModelValue,
    getSearchGlobalFilterListingDetails,
    getFilterSelectedCategoryValue
} from '../selectors'
import {ParamsFetchListingDetails} from '../interfaces'
import {INITIAL_VALUE_OFFSET} from '../../constans'
import {addQueryParams} from '@shared'


export const fetchInitialListingDetails = createAsyncThunk<ListingDetailsSchema, void, ThunkApiConfig>(
    'listing-details/fetchInitialDetails',
    async (_, thunkAPI) => {
        const {getState, extra} = thunkAPI
        const state = getState()

        const searchGlobal = getSearchGlobalFilterListingDetails(state)
        const limit = getLimitListingDetails(state)
        const valueSelectedModel = getFilterSelectedModelValue(state)
        const detailCategoryId = getFilterSelectedCategoryValue(state)
        const offset = INITIAL_VALUE_OFFSET
        
        const params: ParamsFetchListingDetails = {
            limit, offset
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
