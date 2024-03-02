import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {fetchLoginOrganizationByEmail} from '../async-actions/login-organization-by-email'

export interface LoginOrganizationSchema {
  email: string | null
  password: string | null
}

const initialState: LoginOrganizationSchema = {
  email: null,
  password: null
}

export const loginOrganizationSchema = createSlice({
  name: 'login-organization',
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
      .addCase(fetchLoginOrganizationByEmail.pending, (state) => {

      })
      .addCase(fetchLoginOrganizationByEmail.fulfilled, (state) => {
        state.email = ''
        state.password = ''
      })
  }
})

export const {setEmail, setPassword} = loginOrganizationSchema.actions

export const loginOrganizationReducer = loginOrganizationSchema.reducer