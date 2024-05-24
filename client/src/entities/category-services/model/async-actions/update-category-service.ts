import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getSelectedCategoryService} from '../selectors/index'
import {fetchCategoryServices} from './fetch-category-service'

export const updateCategoryService = createAsyncThunk<void, void, ThunkApiConfig>(
    'update-category-detail/updateCategoryDetail',
    async (_, thunkAPI) => {
        try {
            const {getState, extra, dispatch} = thunkAPI
            const state = getState()

            const selectedCategoryDetail = getSelectedCategoryService(state)


            const response = await extra.api.put('/api/service-category', selectedCategoryDetail)
            dispatch(fetchCategoryServices())
            extra.notificationApi.success({
                message: `Категория услуг с ID - ${selectedCategoryDetail.id} обновлена`,
            })
            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
