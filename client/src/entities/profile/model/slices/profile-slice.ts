import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {ProfileResponse, User} from '../../interfaces'
import { UserRoles, Bans, APP_CAR_KEY_LS_USER_ID, APP_CAR_KEY_LS_USER_ROLE, StatusOrganization } from '@shared'
import {featchInitUser} from '../async-actions/fetch-init-user'
import {featchUpdateUser} from '../async-actions/fetch-update-user'
import {logout} from '../async-actions/logout'


export interface ProfileSchema extends ProfileResponse{
  isEditing: boolean
}

const initialState: ProfileSchema = {
  isEditing: false,
  user: {
    id: JSON.parse(localStorage.getItem(APP_CAR_KEY_LS_USER_ID)),
    name: null,
    surname: null,
    email: null,
    role: JSON.parse(localStorage.getItem(APP_CAR_KEY_LS_USER_ROLE)),
    phoneNumber: null,
    ban: Bans.Null
  },
  organization: {
    id: JSON.parse(localStorage.getItem(APP_CAR_KEY_LS_USER_ID)),
    name: null,
    email: null,
    avatar: null,
    phoneNumber: null,
    status: StatusOrganization.Free,
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
    setProfileOrganizationInformation: (state, action: PayloadAction<ProfileResponse>) => {
      state.organization.id = action.payload.organization.id
      state.organization.name = action.payload.organization.name
      state.organization.email = action.payload.organization.email
      state.organization.phoneNumber = action.payload.organization.phoneNumber
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
      .addCase(logout.fulfilled, (state) => {
        state.user = {
          id: null,
          name: null,
          surname: null,
          email: null,
          role: UserRoles.Person,
          phoneNumber: null,
          ban: Bans.Null
        }
      })
  }
})

export const {setProfileInformation, setProfileOrganizationInformation, setIsEditing, setUserData} = profileSlice.actions

export const profileReducer = profileSlice.reducer