import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {fetchUsers} from './fetch-users'

export const deleteUser = createAsyncThunk<string, number, ThunkApiConfig>(
    'delete-user/deleteUser',
    async (id, thunkAPI) => {
        try {
            const { extra, dispatch} = thunkAPI

            const response = await extra.api.delete('/api/user', {
                params: {id}
            })
            
            dispatch(fetchUsers())
            extra.notificationApi.success({
                message: `Пользователь с ID - ${id} удалён`
            })
            return response.data
        } catch (error) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при удалении пользователя',
                description: errorMessage
            })
            throw errorMessage
        }
    }
)
