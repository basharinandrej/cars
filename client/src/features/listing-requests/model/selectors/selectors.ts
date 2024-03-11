import {RootState} from '@app'



export const getRequestsItems = (state: RootState) => state.request.requests
export const getIsUser = (state: RootState) => state.profile.user.id
export const getIsOrganization = (state: RootState) => state.profile.organization.id
export const getSelectedRequestForUpdate = (state: RootState) => state.request.selectedRequestForUpdate
