import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {CategoryServicesResponse} from '../../interfaces'

export const fetchCategoryServices = createAsyncThunk<CategoryServicesResponse, void, ThunkApiConfig>(
    'fetch-category-services/fetchCategoryServices',
    async (_, thunkAPI) => {
        try {
            const { extra} = thunkAPI

            const response = await extra.api.get('/api/service-category')

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
