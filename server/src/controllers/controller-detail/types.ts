import { Pagination} from '@common/types'


export interface ParamsGetAllDetails extends Pagination{
    categoryId?: number
    modelId?: number
}


export interface ParamsSearchDetails extends Pagination {
    keyword: string
    categoryId?: number
    modelId?: number
}
