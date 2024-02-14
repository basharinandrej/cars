import {Pagination} from '@common/types'
import {StatusOrganization} from '@common/enums'


export interface ParamsOrganizationGetAll extends Pagination {
    status: StatusOrganization
}


export interface ParamsOrganizationGetById{
    id: number
}

