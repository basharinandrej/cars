import { SortOrder } from "@common/enums"

export interface CreateBrandDto {
    name: string
}

export interface GetBrandsDto {
    limit: number
    offset: number
    sort?: string
    order?: SortOrder
}

export interface GetOneBrandDto {
    id: number
}