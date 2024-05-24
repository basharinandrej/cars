import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {fetchCategoryDetails, CategoryDetail} from '@entities'
import {getCategoryDetailData} from '../selectors'

export const addNewCategoryDetail = createAsyncThunk<CategoryDetail, void, ThunkApiConfig>(
    'add-new-car/addNewCar',
    async (_, thunkAPI) => {
        try {
            const {getState, extra, dispatch} = thunkAPI
            const state = getState()
            const categoryDetail = getCategoryDetailData(state)


            const response = await extra.api.post<CategoryDetail>('/api/detail-category', categoryDetail)

            dispatch(fetchCategoryDetails())
            extra.notificationApi.success({
                message: `Категория детали с ID - ${response.data.id} добавлена`,
            })
            return response.data
            
        } catch (error: unknown) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при добавлении новой категории деталей',
                description: errorMessage
            })
            throw errorMessage
        }
    }
)
