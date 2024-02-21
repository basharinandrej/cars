import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {ProfileResponse, User} from '../../interfaces'
import { UserRoles, Bans } from '@shared'
import {featchInitUser} from '../async-actions/fetch-init-user'
import {featchUpdateUser} from '../async-actions/fetch-update-user'
import {fetchCarUser} from '../../../garage/model/async-actions/fetch-cars-user'

export interface ProfileSchema extends ProfileResponse{
  isEditing: boolean
}

const initialState: ProfileSchema = {
  isEditing: false,
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
    setProfileInformation: (state, action: PayloadAction<ProfileResponse>) => {
        state.user.id = action.payload.user.id
        state.user.name = action.payload.user.name
        state.user.surname = action.payload.user.surname
        state.user.email = action.payload.user.email
        state.user.phoneNumber = action.payload.user.phoneNumber
        state.user.ban = action.payload.user.ban
        state.user.role = action.payload.user.role
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload
    },
    setUserData: (state, action: PayloadAction<Partial<User>>) => {
      state.user = {
        ...state.user, ...action.payload
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(featchInitUser.fulfilled, (state, action: PayloadAction<ProfileResponse>) => {
        state.user.id = action.payload?.user.id
        state.user.name = action.payload?.user.name
        state.user.surname = action.payload?.user.surname
        state.user.email = action.payload?.user.email
        state.user.phoneNumber = action.payload?.user.phoneNumber
        state.user.ban = action.payload?.user.ban
        state.user.role = action.payload?.user.role
      })
      .addCase(featchUpdateUser.fulfilled, (state) => {
        state.isEditing = false
      })
  }
})

export const {setProfileInformation, setIsEditing, setUserData} = profileSlice.actions

export const profileReducer = profileSlice.reducer