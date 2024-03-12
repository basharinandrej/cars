import {Pagination} from '@common/types'


export interface ParamsGetAllServices extends Pagination {
    serviceCategoryId: number
    organizationId: number
}
