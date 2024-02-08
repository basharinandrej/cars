import { createAsyncThunk } from '@reduxjs/toolkit'
import {BrandByIdResponse} from '../../interfaces'
import {ThunkApiConfig} from '@app'


export const fetchByIdDetailCategory = createAsyncThunk<BrandByIdResponse, unknown, ThunkApiConfig>(
    'detail-category-by-id/fetchByIdDetailCategory',
    async (value, thunkAPI) => {
        try {
            const { extra} = thunkAPI

            const response = await extra.api.get('/api/detail-category/getById', {
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
