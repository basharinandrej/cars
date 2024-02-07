import { createAsyncThunk } from '@reduxjs/toolkit'
import {BrandByIdResponse} from '../../interfaces'
import {ThunkApiConfig} from '@app'


export const fetchByIdBrand = createAsyncThunk<BrandByIdResponse, number, ThunkApiConfig>(
    'brand-by-id/fetchByIdBrand',
    async (value, thunkAPI) => {
        try {
            const { extra} = thunkAPI

            const response = await extra.api.get('/api/brand/getById', {
                params: {
                    id: value
                }
            })

            return response.data

        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
