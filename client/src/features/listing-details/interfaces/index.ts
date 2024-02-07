import {DetailWears} from '../enums/enums'


export interface Detail {
    id: number
    name: string
    vendorCode: string
    year: number
    description: string
    price: number
    wear: DetailWears
    photo: string
    createdAt: string
    modelId: number
}

export interface ListingDetailsResponse {
    items: Detail[],
    total: number
}

export interface Brand {
    label: string
    value: number
}

export interface BrandResponse {
    items: Brand[]
    total: number
}

export interface Model {
    label: string
    value: number
}

export interface ModelResponse {
    items: Model[]
    total: number
}

export interface BrandByIdResponse {
    id: number,
    name: string,
    models: Array<{
        id: number,
        name: string,
        brandId?: number
    }>
}