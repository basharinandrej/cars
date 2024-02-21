import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {CarResponse} from '../../interfaces'

export const fetchCarUser = createAsyncThunk<CarResponse, void, ThunkApiConfig>(
    'fetch-car-user/fetchCarUser',
    async (_, thunkAPI) => {
        try {
            const { extra} = thunkAPI

            const response = await extra.api.get('/api/car')

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
