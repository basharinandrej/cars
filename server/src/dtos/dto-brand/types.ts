import { SortOrderBy } from "@common/enums"

export interface DtoBrandCreation {
    name: string
}

export interface DtoBrandGetAll {
    limit: number
    offset: number
    sort?: string
    order?: SortOrderBy
}

export interface DtoBrandGetById {
    id: number
}