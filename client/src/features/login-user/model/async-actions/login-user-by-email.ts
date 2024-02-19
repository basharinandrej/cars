import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getPassword, getEmail} from '../selectors'
import {setProfileInformation, ProfileResponse} from '@entities'

export const fetchLoginUser = createAsyncThunk<void, void, ThunkApiConfig>(
    'login-user/fetchLoginUser',
    async (_, thunkAPI) => {
        try {
            const {getState, dispatch, extra} = thunkAPI
            const state = getState()

            const email = getEmail(state)
            const password = getPassword(state)

            const response = await extra.api.post<ProfileResponse>('/api/user/login', {
                email, password
            })

            dispatch(setProfileInformation(response.data))
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)