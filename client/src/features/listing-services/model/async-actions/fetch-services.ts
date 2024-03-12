import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import { ServicesResponse } from '@entities'

export const fetchServices = createAsyncThunk<ServicesResponse, number, ThunkApiConfig>(
    'fetch-services/fetchServices',
    async (organizationId, thunkAPI) => {
        try {
            const { extra} = thunkAPI

            const params: Params = {}
            if(organizationId) params.organizationId = organizationId

            const response = await extra.api.get('/api/organization-service-category', {
                params
            })

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)

interface Params {
    organizationId?: number
}