import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {fetchCarUser} from './fetch-cars-user'

export const deleteCarUser = createAsyncThunk<string, string, ThunkApiConfig>(
    'delete-car-user/deleteCarUser',
    async (vinCode, thunkAPI) => {
        try {
            const { extra, dispatch} = thunkAPI

            const response = await extra.api.delete('/api/car', {
                params: {vinCode}
            })
            
            dispatch(fetchCarUser())
            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
