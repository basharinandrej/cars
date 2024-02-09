import {OrganizationRequestParams} from '@common/interfaces'
import {DtoOrganizationRegistration, DtoOrganizationGetAll, DtoOrganizationGetOne} from './types'
import {ParamsOrganizationGetAll, ParamsOrganizationGetById} from '@controllers/controller-organization/types'
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from '@common/constans'
import { Bans, StatusOrganization } from '@common/enums'

class DtoOrganization {
    getDtoOrganizationRegistration(organization: OrganizationRequestParams, fileName:string): DtoOrganizationRegistration {
        return {
            name: organization.name.toLocaleLowerCase(),
            email: organization.email,
            phoneNumber: organization.phoneNumber,
            password: organization.password,
            ban: organization.ban || Bans.Null,
            fingerPrint: organization.fingerPrint,
            status: StatusOrganization.Free,
            avatar: fileName
        }
    }

    getDtoOrganizationGetAll(query: ParamsOrganizationGetAll): DtoOrganizationGetAll {
        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
        }
    }

    getDtoOrganizationGetOne(query: ParamsOrganizationGetById): DtoOrganizationGetOne {
        return {
            id: query.id
        }
    }
}

export default new DtoOrganization()