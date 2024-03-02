import {RootState} from '@app'



export const getMenuItems = (state: RootState) => state.menu.items
export const getNameUser = (state: RootState) => state.profile.user.name
export const getSurnameUser = (state: RootState) => state.profile.user.surname
export const getIdUser = (state: RootState) => state.profile.user.id
export const getIdOrganization = (state: RootState) => state.profile.organization.id
export const getNameOrganization = (state: RootState) => state.profile.organization.name