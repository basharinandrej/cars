import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {InitUserResponse} from '../../interfaces'

export const featchInitOrganization = createAsyncThunk<InitUserResponse, void, ThunkApiConfig>(
    'profile/featchInitOrganization',
    async (_, thunkAPI) => {
        try {
            const { extra} = thunkAPI

            const response = await extra.api.get('/api/organization/init')

            return response.data

        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
