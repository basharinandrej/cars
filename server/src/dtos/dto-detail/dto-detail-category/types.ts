import { Pagination } from "@common/types"

export interface DtoDetailCategoryCreation {
    name: string
}


export interface DtoDetailCategoryGetAll extends Pagination{
    detailCategoryId?: number
    modelId?: number
}


export interface DtoCategoryDetailUpdation {
    id: number
    name: string,
}
