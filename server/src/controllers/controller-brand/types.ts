import { SortOrderBy } from "@common/enums";
import {Pagination} from '@common/types'


export interface ParamsGetAllBrands extends Pagination {
    orderBy?: SortOrderBy
    sortBy?: string
}

export interface ParamsGetOneBrand {
    id: number
}

