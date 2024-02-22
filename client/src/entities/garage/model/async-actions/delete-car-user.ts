import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'


export const deleteCarUser = createAsyncThunk<string, string, ThunkApiConfig>(
    'delete-car-user/deleteCarUser',
    async (vinCode, thunkAPI) => {
        try {
            const { extra} = thunkAPI

            const response = await extra.api.delete('/api/car', {
                params: {vinCode}
            })

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
