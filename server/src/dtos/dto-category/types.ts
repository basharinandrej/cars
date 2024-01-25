export interface DtoCategoryCreation {
    id: number,
    name: string
}


export interface DtoCategoryGetAll {
    limit: number,
    offset: number
    categoryId?: number
    modelId?: number
}
