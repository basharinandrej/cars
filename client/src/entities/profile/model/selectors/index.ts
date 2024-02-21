import {RootState} from '@app'

export const getIdUser = (state: RootState) => state.profile.user.id
export const getDataUser = (state: RootState) => state.profile.user
export const getIsEditing = (state: RootState) => state.profile.isEditing