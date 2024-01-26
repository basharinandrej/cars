import { SortOrderBy } from "@common/enums"
import { Pagination } from "@common/types"

export interface DtoBrandCreation {
    name: string
}

export interface DtoBrandsGetAll extends Pagination {
    sortBy?: string
    orderBy?: SortOrderBy
}

export interface DtoBrandGetById {
    id: number
}