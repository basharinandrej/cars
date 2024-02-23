import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {InitUserResponse} from '../../interfaces'

export const featchInitUser = createAsyncThunk<InitUserResponse, void, ThunkApiConfig>(
    'profile/featchInitUser',
    async (_, thunkAPI) => {
        try {
            const { extra} = thunkAPI

            const response = await extra.api.get('/api/user/init')

            return response.data

        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
