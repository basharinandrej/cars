export interface Model {
    id: number
    name: string
}
export interface ModelResponse {
    count: number
    rows: Model[]
}

export interface FormAddNewModelValueTypes {
    name: string
}


export interface ParamsFetchListingModel {
    sortBy: 'name',
    orderBy: 'asc' | 'desc'
    limit: number
}
