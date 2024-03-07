import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {fetchBrands} from './fetch-brands'

export const deleteBrand = createAsyncThunk<number, number, ThunkApiConfig>(
    'delete-category-detail/deleteCategoryDetail',
    async (id, thunkAPI) => {
        try {
            const { extra, dispatch} = thunkAPI

            const response = await extra.api.delete('/api/brand', {
                params: {id}
            })
            
            dispatch(fetchBrands())
            extra.notificationApi.success({
                message: `Бренд с id - ${id} удален`
            })
            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
