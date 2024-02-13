import { DetailWears } from '@shared'



export interface User {
    id: number | null
    name: string
    surname: string
    phoneNumber: string
}

interface DetailPhoto {
    id: number
    url: string
}

export interface DetailInformationResponse {
    id: number | null
    vendorCode: string | null
    name: string
    wear: DetailWears
    year: number | null
    description: string
    price: number | null
    user: User
    detailPhoto: DetailPhoto[]
}