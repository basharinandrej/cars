import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {RegistrationOrganizationResponse} from '../../interfaces'
import {getRegistrationOrganization} from '../selectors/index'
import { APP_CAR_KEY_LS_ORGANIZATION_ID } from '@shared'
import {setProfileOrganizationInformation} from '@entities'

export const registrationOrganization = createAsyncThunk<void, void, ThunkApiConfig>(
    'registration-organization/registrationOrganization',
    async (_, thunkAPI) => {
        try {
            const { extra, dispatch, getState} = thunkAPI
            const state = getState()
            
            const registrationOrganization = getRegistrationOrganization(state)

            const data = new FormData()
            data.append('name', `${registrationOrganization.name}`)
            data.append('email', `${registrationOrganization.email}`)
            data.append('house', `${registrationOrganization.house}`)
            data.append('password', `${registrationOrganization.password}`)
            data.append('street', `${registrationOrganization.street}`)
            data.append('avatar', registrationOrganization.avatar.file)
            data.append('phoneNumber', `${registrationOrganization.phoneNumber}`)

            const response = await extra.api.post<RegistrationOrganizationResponse>('/api/organization/registration', data)

            console.log('>>>> response', response)
            localStorage.setItem(APP_CAR_KEY_LS_ORGANIZATION_ID, JSON.stringify(response.data.organization.id))

            dispatch(setProfileOrganizationInformation(response.data))

            extra.notificationApi.success({
                message: `Организация с ID-${response.data.organization.id} зарегестрирована`,
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
