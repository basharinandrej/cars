import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getSelectedRequestForUpdate, getIsUser} from '../selectors/selectors'
import {fetchRequests} from './fetch-requests'

export const updateRequest = createAsyncThunk<string|boolean, number, ThunkApiConfig>(
    'update-request/updateRequest',
    async (id, thunkAPI) => {
        try {
            const {getState, extra, dispatch} = thunkAPI
            const state = getState()

            const selectedRequest = getSelectedRequestForUpdate(state)


            const response = await extra.api.put('/api/request', {
                id: selectedRequest.id,
                status: selectedRequest.status,
                description: selectedRequest.description
            })
            dispatch(fetchRequests({
                id: id,
                isUser: Boolean(getIsUser)
            }))

            return response.data
        } catch (error) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при обновлении заявки',
                description: errorMessage
            })
            throw errorMessage      
        }
    }
)
