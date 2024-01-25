import { SortOrder } from "@common/enums"

export interface DtoBrandCreation {
    name: string
}

export interface DtoBrandGetAll {
    limit: number
    offset: number
    sort?: string
    order?: SortOrder
}

export interface DtoBrandGetById {
    id: number
}