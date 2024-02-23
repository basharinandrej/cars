import { Pagination} from '@common/types'


export interface ParamsGetAllDetails extends Pagination{
    keyword: string
    detailCategoryId?: number
    modelId?: number
    userId?: number
}

export interface ParamsGetOneDetail{
    id: number
}