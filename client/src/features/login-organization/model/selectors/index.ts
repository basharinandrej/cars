import {RootState} from '@app'



export const getPassword = (state: RootState) => state.loginUser.password
export const getEmail = (state: RootState) => state.loginUser.email


export const getPasswordOrganization = (state: RootState) => state.loginOrganization.password
export const getEmailOrganization = (state: RootState) => state.loginOrganization.email