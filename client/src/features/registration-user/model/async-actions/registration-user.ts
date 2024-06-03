import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {RegistrationUserResponse} from '../../interfaces'
import {getRegistrationUser} from '../selectors/index'
import { APP_CAR_KEY_LS_USER_ID, APP_CAR_KEY_LS_USER_ROLE, UserRoles } from '@shared'
import {setProfileInformation} from '@entities'

export const registrationUser = createAsyncThunk<void, void, ThunkApiConfig>(
    'registration-user/registrationUser',
    async (_, thunkAPI) => {
        try {
            const { extra, dispatch, getState} = thunkAPI
            const state = getState()
            
            const registrationUser = getRegistrationUser(state)
            const response = await extra.api.post<RegistrationUserResponse>('/api/user/registration', {
                ...registrationUser,
                role: UserRoles.Person
            })

            localStorage.setItem(APP_CAR_KEY_LS_USER_ID, JSON.stringify(response.data.user.id))
            localStorage.setItem(APP_CAR_KEY_LS_USER_ROLE, JSON.stringify(response.data.user.role))


            dispatch(setProfileInformation(response.data))

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
