import { State } from "@common/enums"

export interface DtoDetailCreation {
    name: string
    vendorCode: string
    wear: number
    year: number
    description: string
    price: number
    photos: number
    state: State
    modelId: number
    categoryId: number
}

export interface GetDetailsDto {
    limit: number
    offset: number
    categoryId?: number
    modelId?: number
}

export interface DtoDetailSearch {
    keyword: string
}