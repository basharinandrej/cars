import { SortOrder } from "@common/enums";
import {Pagination} from '@common/types'


export interface ParamsGetAllBrands extends Pagination {
    order?: SortOrder
    sort?: string
}

export interface ParamsGetOneBrand {
    id: number
}

