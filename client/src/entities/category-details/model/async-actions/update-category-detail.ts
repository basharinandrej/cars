import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getSelectedCategoryDetail} from '../selectors/index'
import {fetchCategoryDetails} from '../async-actions/fetch-category-details'

export const updateCategoryDetail = createAsyncThunk<void, void, ThunkApiConfig>(
    'update-category-detail/updateCategoryDetail',
    async (_, thunkAPI) => {
        try {
            const {getState, extra, dispatch} = thunkAPI
            const state = getState()

            const selectedCategoryDetail = getSelectedCategoryDetail(state)


            const response = await extra.api.put('/api/detail-category', selectedCategoryDetail)
            dispatch(fetchCategoryDetails())
            extra.notificationApi.success({
                message: `Категория детали с ID - ${selectedCategoryDetail.id} обновлена`,
            })
            return response.data
        } catch (error) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при обновлении категории детали',
                description: errorMessage
            })
            throw errorMessage      
        }
    }
)
