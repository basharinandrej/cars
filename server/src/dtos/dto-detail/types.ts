
export interface DtoDetailCreation {
    name: string
    vendorCode: string
    wear: number
    year: number
    description: string
    price: number
    photos: number
    modelId: number
    categoryId: number
    wearId: number
}

export interface DtoDetailGetAll {
    limit: number
    offset: number
    categoryId?: number
    modelId?: number
}

export interface DtoDetailSearch {
    keyword: string,
    limit: number,
    offset: number,
    categoryId?: number
    modelId?: number
}