import {RootState} from '@app'



export const getRequestsItems = (state: RootState) => state.request.requests
export const getIsUser = (state: RootState) => state.profile.user.id