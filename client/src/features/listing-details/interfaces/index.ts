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
    value: string
}

export interface BrandResponse {
    items: Brand[]
    total: number
}

export interface Model {
    label: string
    value: string
}

export interface ModelResponse {
    items: Model[]
    total: number
}