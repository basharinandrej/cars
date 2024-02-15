import {RootState} from '@app'

export const getInfoOrganization = (state: RootState) => {
    return {
        id: state.organizationInformation.id,
        name: state.organizationInformation.name,
        phoneNumber: state.organizationInformation.phoneNumber,
        avatar: state.organizationInformation.avatar,
        ban: state.organizationInformation.ban,
        status: state.organizationInformation.status
    }
}

export const getAddressesOrganization = (state: RootState) => state.organizationInformation.addresses

export const getServicesOrganization = (state: RootState) => state.organizationInformation.services
