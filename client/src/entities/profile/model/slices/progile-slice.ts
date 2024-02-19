import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {ProfileResponse} from '../../interfaces'
import { UserRoles, Bans } from '@shared'

export interface ProfileSchema extends ProfileResponse{
}

const initialState: ProfileSchema = {
    user: {
        id: null,
        name: null,
        surname: null,
        email: null,
        role: UserRoles.Person,
        phoneNumber: null,
        ban: Bans.Null
    }
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileInformation: (state, action: PayloadAction<ProfileSchema>) => {
        state.user.id = action.payload.user.id
        state.user.name = action.payload.user.name
        state.user.surname = action.payload.user.surname
        state.user.email = action.payload.user.email
        state.user.phoneNumber = action.payload.user.phoneNumber
        state.user.ban = action.payload.user.ban
        state.user.role = action.payload.user.role
    }
  }
})

export const {setProfileInformation} = profileSlice.actions

export const profileReducer = profileSlice.reducer