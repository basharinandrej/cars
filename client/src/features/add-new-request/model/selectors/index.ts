import {RootState} from '@app'


export const getIdProfile = (state: RootState) => state.profile.user.id
export const getRequestData = (state: RootState) => state.addNewRequest.request
