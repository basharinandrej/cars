import {Pagination} from '@common/types'


export interface ParamsGetAllModels extends Pagination {
    brandId?: number
}

export interface ParamsGetOneModel {
    id: number
}

