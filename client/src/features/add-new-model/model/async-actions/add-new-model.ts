import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {fetchModels, Model} from '@entities'
import {getModelData} from '../selectors'

export const addNewModel = createAsyncThunk<Model, void, ThunkApiConfig>(
    'add-new-model/addNewModel',
    async (_, thunkAPI) => {
        try {
            const {getState, extra, dispatch} = thunkAPI
            const state = getState()
            const brand = getModelData(state)


            const response = await extra.api.post<Model>('/api/model', brand)

            dispatch(fetchModels())
            extra.notificationApi.success({
                message: `Модель с ID - ${response.data.id} добавлена`,
            })
            return response.data
            
        } catch (error: unknown) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при добавлении новой модели',
                description: errorMessage
            })
            throw errorMessage
        }
    }
)
