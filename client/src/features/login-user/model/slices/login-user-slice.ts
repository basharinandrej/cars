import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {fetchLoginUserByEmail} from '../async-actions/login-user-by-email'

export interface LoginUserSchema {
  email: string | null
  password: string | null
}

const initialState: LoginUserSchema = {
  email: null,
  password: null
}

export const loginUserSchema = createSlice({
  name: 'login-user',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLoginUserByEmail.pending, (state) => {

      })
      .addCase(fetchLoginUserByEmail.fulfilled, (state) => {
        state.email = ''
        state.password = ''
      })
  }
})

export const {setEmail, setPassword} = loginUserSchema.actions

export const loginUserReducer = loginUserSchema.reducer