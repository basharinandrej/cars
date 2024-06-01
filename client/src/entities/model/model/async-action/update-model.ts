import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getSelectedModel} from '../selectors/index'
import {fetchModels} from './fetch-models'

export const updateModel = createAsyncThunk<void, void, ThunkApiConfig>(
    'update-model/updateModel',
    async (_, thunkAPI) => {
        try {
            const {getState, extra, dispatch} = thunkAPI
            const state = getState()

            const selectedModel = getSelectedModel(state)


            const response = await extra.api.put('/api/model', selectedModel)
            extra.notificationApi.success({
                message: `Модель с ID - ${selectedModel.id} обновлёна`,
            })
            dispatch(fetchModels())

            return response.data
        } catch (error) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при обновлении модели',
                description: errorMessage
            })
            throw errorMessage         
        }
    }
)
