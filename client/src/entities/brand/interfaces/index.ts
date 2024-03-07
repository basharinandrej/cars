export interface Brand {
    id: number
    name: string
}
export interface BrandResponse {
    total: number
    items: Brand[]
}

export interface FormAddNewBrandValueTypes {
    name: string
}


export interface ParamsFetchListingBrand {
    sortBy: 'name',
    orderBy: 'asc' | 'desc'
    limit: number
}
