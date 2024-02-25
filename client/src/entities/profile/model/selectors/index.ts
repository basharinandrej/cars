import {RootState} from '@app'

export const getDataUser = (state: RootState) => state.profile.user
export const getIsEditing = (state: RootState) => state.profile.isEditing
export const getUserRole = ({profile}: RootState) => profile.user.role
export const getUserId = ({profile}: RootState) => profile.user.id