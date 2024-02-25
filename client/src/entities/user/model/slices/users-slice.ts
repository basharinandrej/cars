import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {UsersResponse, FormUpdateUserValueTypes} from '../../interfaces/interfaces'
import { fetchUsers } from '../async-actions/fetch-users'
import {User} from '../../interfaces/interfaces'
import { UserRoles } from '@shared'


interface RoleOption {
  label: string,
  value: UserRoles,
}

export interface UsersSchema extends UsersResponse {
  selectedUserForUpdate: User
  roleOptions: Array<RoleOption>
  isDisabledRoleSelect: boolean
}

const initialState: UsersSchema = {
    items: [],
    total: 0,
    selectedUserForUpdate: null,
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
      state.selectedUserForUpdate = state.items.find((item) => item.id === action.payload)
    },
    updateSelectedUser: (state, action: PayloadAction<Partial<FormUpdateUserValueTypes>>) => {
      state.selectedUserForUpdate = {
          ...state.selectedUserForUpdate, ...action.payload
      }
    },
    setIsDisabledRoleSelect: (state, action: PayloadAction<UserRoles>) => {

      state.isDisabledRoleSelect = state.selectedUserForUpdate.role ===  UserRoles.Admin
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UsersResponse>) => {
          state.items = action.payload.items
          state.total = action.payload.total
      })
  }
})

export const {selectedUserForUpdate, updateSelectedUser, setIsDisabledRoleSelect} = usersSlice.actions

export const usersReducers = usersSlice.reducer