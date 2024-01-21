export interface CreateCategoryDto {
    id: number,
    name: string
}


export interface DtoCategoryGetAll {
    limit: number,
    offset: number
    categoryId?: number
    modelId?: number
}
