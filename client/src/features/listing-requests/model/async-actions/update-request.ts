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
            console.log('>>> error', error)
        }
    }
)
