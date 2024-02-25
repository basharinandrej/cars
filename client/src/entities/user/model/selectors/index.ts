import {RootState} from '@app'

export const getUsers = (state: RootState) => state.users.items
export const getSelectedUserUpdate = (state: RootState) => state.users.selectedUserForUpdate
export const getRoleOptions = (state: RootState) => state.users.roleOptions
export const getIsDisabledSelectRole = (state: RootState) => state.users.isDisabledRoleSelect

export const getRoleCurrentUser = (state: RootState) => state.profile.user.role