export interface DtoModelCreation {
    name: string
    brandId?: number
}

export interface DtoModelGetAll {
    limit: number
    offset: number
    brandId?: number
}

export interface DtoModelGetById {
    id: number
}

export interface DtoModelUpdation {
    name: string
    id: number
    brandId?: number
}