import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {BrandResponse, ParamsFetchListingBrand} from '../../interfaces'

export const fetchBrands = createAsyncThunk<BrandResponse, void, ThunkApiConfig>(
    'fetch-brands/fetchBrands',
    async (_, thunkAPI) => {
        try {
            const { extra} = thunkAPI
            const params:ParamsFetchListingBrand = {
                sortBy: 'name',
                orderBy: 'asc',
                limit: 40
            }
            const response = await extra.api.get('/api/brand', {params})

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
