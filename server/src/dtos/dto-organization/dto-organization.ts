import {OrganizationChangePasswordParams, OrganizationRequestParams} from '@common/interfaces'
import {
    DtoOrganizationRegistration, 
    DtoOrganizationGetAll,
    DtoOrganizationLogin,
    DtoOrganizationGetOne,
    DtoInitOrganization,
    DtoOrganizationChangePassword
} from './types'
import {ParamsOrganizationGetAll, ParamsOrganizationGetById} from '@controllers/controller-organization/types'
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from '@common/constans'
import { Bans, StatusOrganization } from '@common/enums'
import {Cookies} from '@common/interfaces'
import {serviceToken} from '@services/service-token'


class DtoOrganization {
    getDtoOrganizationRegistration(organization: OrganizationRequestParams, fileName:string): DtoOrganizationRegistration {
        return {
            name: organization.name.toLocaleLowerCase(),
            email: organization.email,
            phoneNumber: organization.phoneNumber,
            password: organization.password,
            ban: organization.ban || Bans.Null,
            status: StatusOrganization.Free,
            avatar: fileName
        }
    }

    getDtoOrganizationGetAll(query: ParamsOrganizationGetAll): DtoOrganizationGetAll {
        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
            status: query.status,
            serviceCategoryId: query.serviceCategoryId
        }
    }

    getDtoOrganizationGetOne(query: ParamsOrganizationGetById): DtoOrganizationGetOne {
        return {
            id: query.id
        }
    }

    getDtoOrganizationLogin(organization: OrganizationRequestParams): DtoOrganizationLogin {

        return {
            email: organization.email,
            password: organization.password,
        }
    }

    getDtoInitOrganization(cookies: Cookies): DtoInitOrganization {
        const token = cookies.refreshToken
        return serviceToken.validationToken(token)
    }


    getDtoChangePassword(body: OrganizationChangePasswordParams, cookies: Cookies): DtoOrganizationChangePassword {
        const token = cookies.refreshToken
        const payload = serviceToken.validationToken(token)

        return {
            oldPassword: body.oldPassword,
            newPassword: body.newPassword,
            organizationId: payload.id
        }
    }
}

export default new DtoOrganization()