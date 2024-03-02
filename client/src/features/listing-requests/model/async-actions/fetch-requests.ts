import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import { RequestsResponse } from '@entities'

export const fetchRequests = createAsyncThunk<RequestsResponse, number, ThunkApiConfig>(
    'fetch-request/fetchRequests',
    async (id, thunkAPI) => {
        try {
            const { extra} = thunkAPI

            const response = await extra.api.get('/api/request', {
                params: {
                    userId: id
                }
            })

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
