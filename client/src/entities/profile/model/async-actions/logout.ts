import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {APP_CAR_KEY_LS_USER_ID, APP_CAR_KEY_LS_USER_ROLE, APP_CAR_KEY_LS_ORGANIZATION_ID} from '@shared'

export const logout = createAsyncThunk<void, void, ThunkApiConfig>(
    'profile/logout',
    async (_, thunkAPI) => {
        try {
            const {extra} = thunkAPI
            await extra.api.get('/api/user/logout')
            localStorage.removeItem(APP_CAR_KEY_LS_USER_ID)
            localStorage.removeItem(APP_CAR_KEY_LS_USER_ROLE)
            localStorage.removeItem(APP_CAR_KEY_LS_ORGANIZATION_ID)
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)