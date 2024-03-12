import {RootState} from '@app'



export const getItemsServiceCategories = ({addNewService}: RootState) => addNewService.serviceCategories?.items
export const getOrganizationId = ({profile}: RootState) => profile.organization.id
export const getDataService = ({addNewService}: RootState) => addNewService.service
export const getIdOrganization = ({profile}: RootState) => profile.organization.id