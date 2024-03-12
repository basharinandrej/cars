import {RootState} from '@app'



export const getIdOrganization = ({profile}: RootState) => profile.organization.id
export const getServices = ({services}: RootState) => services.services