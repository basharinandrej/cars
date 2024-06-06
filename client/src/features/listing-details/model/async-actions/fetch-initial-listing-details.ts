import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {
    getLimitListingDetails,
    getFilterSelectedModelValue,
    getSearchGlobalFilterListingDetails,
    getFilterSelectedCategoryValue,
    getFilterSelectedBrandValue
} from '../selectors'

import {ParamsFetchListingDetails} from '../interfaces'
import {ListingDetailsResponse} from '../../interfaces'

import {INITIAL_VALUE_OFFSET_LISTING_DETAILS} from '../../constans'

import {addQueryParams} from '@shared'
import { AxiosError } from 'axios'


export const fetchInitialListingDetails = createAsyncThunk<ListingDetailsResponse, number|void, ThunkApiConfig>(
    'listing-details/fetchInitialDetails',
    async (userId, thunkAPI) => {
        const {getState, extra} = thunkAPI
        const state = getState()

        const searchGlobal = getSearchGlobalFilterListingDetails(state)
        const limit = getLimitListingDetails(state)
        const valueSelectedModel = getFilterSelectedModelValue(state)
        const valueSelectedBrand = getFilterSelectedBrandValue(state)
        const detailCategoryId = getFilterSelectedCategoryValue(state)
        const offset = INITIAL_VALUE_OFFSET_LISTING_DETAILS
        
        const params: ParamsFetchListingDetails = {
            limit, offset
        }

        if(searchGlobal) params.keyword = searchGlobal
        if(valueSelectedModel) params.modelId = valueSelectedModel
        if(detailCategoryId) params.detailCategoryId = detailCategoryId
        if(valueSelectedBrand) params.brandId = valueSelectedBrand
        if(userId) params.userId = userId

        addQueryParams('keyword', params.keyword)
        addQueryParams('modelId', params.modelId)
        addQueryParams('detailCategoryId', params.detailCategoryId)
        addQueryParams('brandId', params.brandId)

        try {
            const response = await extra.api.get('/api/detail', {
                params
            })
            return response.data
        } catch (error) {
            if(error instanceof AxiosError) {
                return error.response.data.message
            }
        }
    }
)
