import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getDataUserForUpdate} from '../selectors'

export const featchUpdateUser = createAsyncThunk<void, void, ThunkApiConfig>(
    'profile/featchUpdateUser',
    async (_, thunkAPI) => {
        try {
            const {getState, extra} = thunkAPI
            const state = getState()

            const user = getDataUserForUpdate(state)
            extra.notificationApi.success({
                message: `Профиль успешно обновлён `,
            })
            await extra.api.patch('/api/user', user)
        } catch (error) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при обновлении профиля',
                description: errorMessage
            })
            throw errorMessage       
        }
    }
)
