import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {UsersResponse, FormUpdateUserValueTypes} from '../../interfaces/interfaces'
import { fetchUsers } from '../async-actions/fetch-users'
import {User} from '../../interfaces/interfaces'
import { APP_CAR_KEY_LS_USER_ID, APP_CAR_KEY_LS_USER_ROLE, UserRoles } from '@shared'


interface RoleOption {
  label: string,
  value: UserRoles,
}

export interface UsersSchema extends UsersResponse {
  selectedUserForUpdate: User
  roleOptions: Array<RoleOption>
  isDisabledRoleSelect: boolean
  idCurrentUser: number
}

const initialState: UsersSchema = {
    rows: [],
    count: 0,
    selectedUserForUpdate: null,
    idCurrentUser: null,
    roleOptions: [
      {label: 'Администратор', value: UserRoles.Admin},
      {label: 'Модератор', value: UserRoles.Moderator},
      {label: 'Пользователь', value: UserRoles.Person}
    ],
    isDisabledRoleSelect: true
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectedUserForUpdate: (state, action:PayloadAction<number>) => {
      state.selectedUserForUpdate = state.rows.find((item) => item.id === action.payload)
    },
    updateSelectedUser: (state, action: PayloadAction<Partial<FormUpdateUserValueTypes>>) => {
      state.selectedUserForUpdate = {
          ...state.selectedUserForUpdate, ...action.payload
      }
    },
    setIsDisabledRoleSelect: (state) => {
      const roleOfProfile = JSON.parse(localStorage.getItem(APP_CAR_KEY_LS_USER_ROLE))
      const myId = localStorage.getItem(APP_CAR_KEY_LS_USER_ID)
      const isMe = Number(myId) === state.selectedUserForUpdate.id

      state.isDisabledRoleSelect = isMe || roleOfProfile !== UserRoles.Admin
    },
    setCurrentUser: (state) => {
      state.idCurrentUser = Number(localStorage.getItem(APP_CAR_KEY_LS_USER_ID))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UsersResponse>) => {
          state.rows = action.payload.rows
          state.count = action.payload.count
      })
  }
})

export const {selectedUserForUpdate, updateSelectedUser, setCurrentUser, setIsDisabledRoleSelect} = usersSlice.actions

export const usersReducers = usersSlice.reducer