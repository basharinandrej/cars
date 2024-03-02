import {Pagination} from '@common/types'


export interface ParamsRequestGetAll extends Pagination {
    userId: number
}


export interface ParamsRequestGetById{
    id: number
}

