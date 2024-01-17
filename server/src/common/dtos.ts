import { State } from "@common/enums"

export interface CreateBrandDto {
    name: string
}

export interface GetBrandsDto {
    limit: number
    offset: number
}

export interface CreateModelDto {
    name: string
    brandId: number
    typeCarId: number
}

export interface GetModelsDto {
    limit: number
    offset: number
}

export interface CreateTypeCarDto {
    name: string
}

export interface GetTypesCarDto {
    limit: number
    offset: number
}

export interface CreateDetailDto {
    name: string
    vendorCode: number
    wear: number
    year: number
    description: string
    price: number
    photos: number
    state: State
    typeDetailId: number
}

export interface GetDetailsDto {
    limit: number
    offset: number
}