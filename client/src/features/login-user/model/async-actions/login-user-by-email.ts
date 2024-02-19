import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getPassword, getEmail} from '../selectors'

export const fetchLoginUser = createAsyncThunk<void, void, ThunkApiConfig>(
    'login-user/fetchLoginUser',
    async (_, thunkAPI) => {
        try {
            const {getState, extra} = thunkAPI
            const state = getState()

            const email = getEmail(state)
            const password = getPassword(state)

            const response = await extra.api.post('/api/user/login', {
                email, password
            })

            console.log('>>> response', response)
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)