import {RootState} from '@app'

export const getUsers = (state: RootState) => state.users.rows
export const getSelectedUserUpdate = (state: RootState) => state.users.selectedUserForUpdate
export const getRoleOptions = (state: RootState) => state.users.roleOptions
export const getIsDisabledSelectRole = (state: RootState) => state.users.isDisabledRoleSelect

