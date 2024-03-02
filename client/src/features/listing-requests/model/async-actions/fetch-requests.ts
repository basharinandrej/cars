import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import { RequestsResponse } from '@entities'

export const fetchRequests = createAsyncThunk<RequestsResponse, {id: number, isUser: boolean}, ThunkApiConfig>(
    'fetch-request/fetchRequests',
    async ({id, isUser}, thunkAPI) => {
        try {
            const { extra} = thunkAPI

            const params: Params = {}
            if(isUser) {
                params.senderId = id
            } else {
                params.recipientId = id
            }
            const response = await extra.api.get('/api/request', {
                params
            })

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)

interface Params {
    senderId?: number
    recipientId?: number
}