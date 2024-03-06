import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {fetchCategoryServices} from './fetch-category-service'

export const deleteCategoryService = createAsyncThunk<number, number, ThunkApiConfig>(
    'delete-category-service/deleteCategoryService',
    async (id, thunkAPI) => {
        try {
            const { extra, dispatch} = thunkAPI

            const response = await extra.api.delete('/api/service-category', {
                params: {id}
            })
            
            dispatch(fetchCategoryServices())
            extra.notificationApi.success({
                message: `Категория услуги с id - ${id} удалена`
            })
            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
