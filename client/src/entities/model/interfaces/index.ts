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
    brandId: number
}


export interface ParamsFetchListingModel {
    sortBy: 'name',
    orderBy: 'asc' | 'desc'
    limit: number
}

export interface Brand {
    label: string
    value: number
}

export interface BrandsResponse {
    rows: Brand[]
    count: number
}
  
