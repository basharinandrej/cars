import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getDataOrganizationForUpdate} from '../selectors'

export const featchUpdateOrganization = createAsyncThunk<void, void, ThunkApiConfig>(
    'profile/featchUpdateOrganization',
    async (_, thunkAPI) => {
        try {
            const {getState, extra} = thunkAPI
            const state = getState()

            const organization = getDataOrganizationForUpdate(state)
            await extra.api.patch('/api/organization', organization)
            extra.notificationApi.success({
                message: `Профиль успешно обновлён `,
            })
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
