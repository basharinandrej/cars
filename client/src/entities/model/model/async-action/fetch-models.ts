import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {ModelResponse, ParamsFetchListingModel} from '../../interfaces'

export const fetchModels = createAsyncThunk<ModelResponse, void, ThunkApiConfig>(
    'fetch-models/fetchModels',
    async (_, thunkAPI) => {
        try {
            const { extra} = thunkAPI
            const params:ParamsFetchListingModel = {
                sortBy: 'name',
                orderBy: 'asc',
                limit: 40
            }
            const response = await extra.api.get('/api/model', {params})

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
