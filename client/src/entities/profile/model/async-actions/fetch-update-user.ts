import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getDataUser} from '../selectors'

export const featchUpdateUser = createAsyncThunk<void, void, ThunkApiConfig>(
    'profile/featchUpdateUser',
    async (_, thunkAPI) => {
        try {
            const {getState, extra} = thunkAPI
            const state = getState()

            const user = getDataUser(state)

            await extra.api.put('/api/user', user)
        } catch (error) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при обновлении пользователя',
                description: errorMessage
            })
            throw errorMessage            }
    }
)
