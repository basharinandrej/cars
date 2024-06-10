import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface RegistrationOrganizationSchema {
    name: string | null
    email: string | null
    password: string | null
    phoneNumber: number | null
    street: string | null
    house: number | null,
    avatar: Avatar | null
}

interface Avatar {
    id: string
    file: File
}

const initialState: RegistrationOrganizationSchema = {
    name: null,
    email: null,
    password: null,
    phoneNumber: null,
    street: null,
    house: null,
    avatar: null
}


export const registrationOrganizationSchema = createSlice({
  name: 'registration-organization',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
        state.name = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
    setPhoneNumber: (state, action: PayloadAction<number>) => {
        state.phoneNumber = action.payload
    },
    setStreet: (state, action: PayloadAction<string>) => {
        state.street = action.payload
    },
    setHouseNumber: (state, action: PayloadAction<number>) => {
        state.house = action.payload
    },
    setAvatar: (state, action: PayloadAction<Avatar>) => {
        state.avatar = action.payload
    },
    deleteAvatar: (state) => {
        state.avatar = null
      }
  }
})

export const {
    setName, 
    setEmail,
    setPassword,
    setPhoneNumber,
    setHouseNumber,
    setStreet,
    setAvatar,
    deleteAvatar
} = registrationOrganizationSchema.actions

export const registrationOrganizationReducer = registrationOrganizationSchema.reducer