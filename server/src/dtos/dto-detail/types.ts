import { DetailWears } from "@common/enums"
import { Pagination } from "@common/types"

export interface DtoDetailCreation {
    name: string
    vendorCode: string
    wear: DetailWears
    year: string
    description: string
    price: number
    modelId?: number
    detailCategoryId?: number
    userId: number
}

export interface DtoDetailGetAll extends Pagination{
    detailCategoryId?: number
    modelId?: number
    keyword?: string
    userId?: number
}

export interface DtoDetailSearch extends Pagination {
    keyword: string,
    detailCategoryId?: number
    modelId?: number
}

export interface DtoDetailGetById {
    id: number
}