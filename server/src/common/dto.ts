
export interface CreateBrandDto {
    name: string
}

export interface GetBrandsDto {
    limit: number
    offset: number
}

export interface CreateModelDto {
    name: string
    brandId: number
    typeCarId: number
}

export interface GetModelsDto {
    limit: number
    offset: number
}