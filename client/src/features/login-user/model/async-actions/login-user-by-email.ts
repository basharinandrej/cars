import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getPassword, getEmail} from '../selectors'
import {setProfileInformation, ProfileResponse} from '@entities'
import {APP_CAR_KEY_LS_USER_ID, APP_CAR_KEY_LS_USER_ROLE} from '@shared'

export const fetchLoginUserByEmail = createAsyncThunk<void, void, ThunkApiConfig>(
    'login-user-by-email/fetchLoginUserByEmail',
    async (_, thunkAPI) => {
        try {
            const {getState, dispatch, extra} = thunkAPI
            const state = getState()

            const email = getEmail(state)
            const password = getPassword(state)

            const response = await extra.api.post<ProfileResponse>('/api/user/login', {
                email, password
            })

            localStorage.setItem(APP_CAR_KEY_LS_USER_ID, JSON.stringify(response.data.user.id))
            localStorage.setItem(APP_CAR_KEY_LS_USER_ROLE, JSON.stringify(response.data.user.role))
            dispatch(setProfileInformation(response.data))
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)