import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getRequestData} from '../selectors'

export const addNewRequest = createAsyncThunk<void, void, ThunkApiConfig>(
    'add-new-request/addNewRequest',
    async (_, thunkAPI) => {
        try {
            const {getState, extra} = thunkAPI
            const state = getState()
            const requestData = getRequestData(state)

            const response = await extra.api.post('/api/request', requestData)
            extra.notificationApi.success({
                message: 'Новая заявка добавлена',
            })

            return response.data
            
        } catch (error: unknown) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при добавлении новой заявки',
                description: errorMessage
            })
            throw errorMessage
        }
    }
)
