import {DetailWears} from '@shared'


interface DetailPhoto {
    id: number
    url: string
    detailId: Number
}

export interface IDetail {
    id: number
    name: string
    vendorCode: string
    year: number
    description: string
    price: number
    wear: DetailWears
    detailPhoto: DetailPhoto[]
    createdAt: string
    modelId: number
    detailCategoryId?: number
}