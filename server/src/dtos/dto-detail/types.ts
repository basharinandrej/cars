import { State } from "@common/enums"

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
    modelId: number
}

export interface GetDetailsDto {
    limit: number
    offset: number
}