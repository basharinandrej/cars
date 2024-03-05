import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {CategoryDetailsResponse} from '../../interfaces'

export const fetchCategoryDetails = createAsyncThunk<CategoryDetailsResponse, void, ThunkApiConfig>(
    'fetch-category-details/fetchCategoryDetails',
    async (_, thunkAPI) => {
        try {
            const { extra} = thunkAPI

            const response = await extra.api.get('/api/detail-category')

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
