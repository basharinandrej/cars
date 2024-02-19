import {RootState} from '@app'



export const getPassword = (state: RootState) => state.loginUser.password
export const getEmail = (state: RootState) => state.loginUser.email