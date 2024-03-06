import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {fetchCategoryServices, CategoryService} from '@entities'
import {getCategoryServiceData} from '../selectors'

export const addNewCategoryService= createAsyncThunk<CategoryService, void, ThunkApiConfig>(
    'add-new-category-service/addNewCategoryService',
    async (_, thunkAPI) => {
        try {
            const {getState, extra, dispatch} = thunkAPI
            const state = getState()
            const categoryDetail = getCategoryServiceData(state)


            const response = await extra.api.post<CategoryService>('/api/service-category', categoryDetail)

            dispatch(fetchCategoryServices())
            return response.data
            
        } catch (error: unknown) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при добавлении новой категории услуги',
                description: errorMessage
            })
            throw errorMessage
        }
    }
)
