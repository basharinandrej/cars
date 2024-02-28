import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'

export const deleteDetail = createAsyncThunk<string, number, ThunkApiConfig>(
    'delete-by-id-detail/deleteDetail',
    async (id, thunkAPI) => {
        try {
            const { extra} = thunkAPI

            const response = await extra.api.delete('/api/detail', {
                params: {id}
            })
            
            extra.notificationApi.success({
                message: `Деталь с ID - ${id} удалена`
            })
            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
