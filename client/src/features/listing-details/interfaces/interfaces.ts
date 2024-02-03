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
}

export interface ListingDetailsResponse {
    items: Detail[],
    total: number
}