import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {fetchModels} from './fetch-models'

export const deleteModel = createAsyncThunk<number, number, ThunkApiConfig>(
    'delete-model/deleteModel',
    async (id, thunkAPI) => {
        try {
            const { extra, dispatch} = thunkAPI

            const response = await extra.api.delete('/api/model', {
                params: {id}
            })
            
            dispatch(fetchModels())
            extra.notificationApi.success({
                message: `Модель с id - ${id} удалена`
            })
            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
