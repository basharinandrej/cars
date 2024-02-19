import { PayloadAction, createSlice } from '@reduxjs/toolkit'


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
  }
})

export const {setEmail, setPassword} = loginUserSchema.actions

export const loginUserReducer = loginUserSchema.reducer