import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {RegistrationUserResponse} from '../../interfaces'
import {getRegistrationUser} from '../selectors/index'
import { UserRoles } from '@shared'

export const registrationUser = createAsyncThunk<void, void, ThunkApiConfig>(
    'registration-user/registrationUser',
    async (_, thunkAPI) => {
        try {
            const { extra, getState} = thunkAPI
            const state = getState()
            
            const registrationUser = getRegistrationUser(state)
            const response = await extra.api.post<RegistrationUserResponse>('/api/user/registration', {
                ...registrationUser,
                role: UserRoles.Person
            })

            extra.notificationApi.success({
                message: `Пользователь с ID-${response.data.user.id} зарегестрирован`,
            })
        } catch (error) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при регистрации',
                description: errorMessage
            })
            throw errorMessage   
        }
    }
)
