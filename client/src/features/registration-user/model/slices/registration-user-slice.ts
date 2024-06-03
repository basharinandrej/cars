import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface RegistrationUserSchema {
    name: string | null
    surname: string | null
    email: string | null
    password: string | null
    phoneNumber: number | null
}

const initialState: RegistrationUserSchema = {
    name: null,
    surname: null,
    email: null,
    password: null,
    phoneNumber: null
}

export const registrationUserSchema = createSlice({
  name: 'registration-user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
        state.name = action.payload
    },
    setSurname: (state, action: PayloadAction<string>) => {
        state.surname = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
    setPhoneNumber: (state, action: PayloadAction<number>) => {
        state.phoneNumber = action.payload
    }
  },
  extraReducers(builder) {
  }
})

export const {
    setName, 
    setSurname, 
    setEmail,
    setPassword,
    setPhoneNumber,
} = registrationUserSchema.actions

export const registrationUserReducer = registrationUserSchema.reducer