import { SortOrderBy } from "@common/enums";
import {Pagination} from '@common/types'


export interface ParamsGetAllBrands extends Pagination {
    order?: SortOrderBy
    sort?: string
}

export interface ParamsGetOneBrand {
    id: number
}

