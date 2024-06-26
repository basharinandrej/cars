import { IDetail } from '@entities'
import {CommonListing} from '@shared'

export interface ListingDetailsResponse extends CommonListing {
    rows: IDetail[],
}


export interface Brand {
    label: string
    value: number
}
export interface BrandResponse {
    rows: Brand[]
    count: number
}


export interface Model {
    label: string
    value: number
}
export interface ModelResponse {
    rows: Model[]
    count: number
}


export interface Category {
    label: string,
    value: number
}

export interface CategoryResponse {
    count: number,
    rows: Category[]
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