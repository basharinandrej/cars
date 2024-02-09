import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {DetailInformationResponse} from '../../interfaces'

export const fetchByIdDetail = createAsyncThunk<DetailInformationResponse, number, ThunkApiConfig>(
    'detail-by-id/fetchByIdDetail',
    async (id, thunkAPI) => {
        try {
            const { extra} = thunkAPI

            const response = await extra.api.get('/api/detail/getById', {
                params: {
                    id
                }
            })

            return response.data

        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
