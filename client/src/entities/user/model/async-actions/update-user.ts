import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {fetchUsers} from './fetch-users'
import {getSelectedUserUpdate} from '../selectors'


export const updateUser = createAsyncThunk<string|boolean, void, ThunkApiConfig>(
    'update-user/updateUser',
    async (_, thunkAPI) => {
        try {
            const {getState, extra, dispatch} = thunkAPI
            const state = getState()

            const selectedUser = getSelectedUserUpdate(state)


            const response = await extra.api.put('/api/user', selectedUser)
            dispatch(fetchUsers())
            extra.notificationApi.success({
                message: `Пользователь с ID - ${selectedUser.id} обновлён`
            })
            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)