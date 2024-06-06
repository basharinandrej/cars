import {Pagination} from '@common/types'
import {Bans, StatusOrganization} from '@common/enums'


export interface ParamsOrganizationGetAll extends Pagination {
    status: StatusOrganization
    serviceCategoryId: number
    ban: Bans
}


export interface ParamsOrganizationGetById{
    id: number
}

