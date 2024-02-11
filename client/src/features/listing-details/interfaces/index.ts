import {DetailWears, CommonListing} from '@shared'


interface DetailPhoto {
    id: number
    url: string
    detailId: Number
}

export interface Detail {
    id: number
    name: string
    vendorCode: string
    year: number
    description: string
    price: number
    wear: DetailWears
    detailPhoto: DetailPhoto
    createdAt: string
    modelId: number
    detailCategoryId?: number
}
export interface ListingDetailsResponse extends CommonListing {
    items: Detail[],
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


export interface Category {
    label: string,
    value: number
}
export interface CategoryResponse {
    total: number,
    items: Category[]
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