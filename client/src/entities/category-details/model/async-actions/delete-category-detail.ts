import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {fetchCategoryDetails} from './fetch-category-details'

export const deleteCategoryDetail = createAsyncThunk<number, number, ThunkApiConfig>(
    'delete-category-detail/deleteCategoryDetail',
    async (id, thunkAPI) => {
        try {
            const { extra, dispatch} = thunkAPI

            const response = await extra.api.delete('/api/detail-category', {
                params: {id}
            })
            
            dispatch(fetchCategoryDetails())
            extra.notificationApi.success({
                message: `Категория детали с id - ${id} удалена`
            })
            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
