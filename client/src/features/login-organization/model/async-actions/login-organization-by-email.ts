import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getEmailOrganization, getPasswordOrganization} from '../selectors'
import {setProfileOrganizationInformation, ProfileResponse} from '@entities'
import {APP_CAR_KEY_LS_ORGANIZATION_ID} from '@shared'

export const fetchLoginOrganizationByEmail = createAsyncThunk<void, void, ThunkApiConfig>(
    'login-organization-by-email/fetchLoginOrganizationByEmail',
    async (_, thunkAPI) => {
        try {
            const {getState, dispatch, extra} = thunkAPI
            const state = getState()

            const email = getEmailOrganization(state)
            const password = getPasswordOrganization(state)

            const response = await extra.api.post<ProfileResponse>('/api/organization/login', {
                email, password
            })
            const userId = response.data.organization.id

            localStorage.setItem(APP_CAR_KEY_LS_ORGANIZATION_ID, JSON.stringify(userId))
            dispatch(setProfileOrganizationInformation(response.data))
            
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)