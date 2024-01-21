export interface CreateModelDto {
    name: string
    brandId: number
}

export interface GetAllModelsDto {
    limit: number
    offset: number
    brandId?: number
}

export interface GetOneModelDto {
    id: number
}
