import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {UsersResponse} from '../../interfaces/interfaces'

export const featchUsers = createAsyncThunk<UsersResponse, void, ThunkApiConfig>(
    'user/featchUsers',
    async (_, thunkAPI) => {
        try {
            const { extra} = thunkAPI

            const response = await extra.api.get('/api/user')

            return response.data

        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
