export interface Brand {
    id: number
    name: string
}
export interface BrandResponse {
    count: number
    rows: Brand[]
}

export interface FormAddNewBrandValueTypes {
    name: string
    brandId: number
}


export interface ParamsFetchListingBrand {
    sortBy: 'name',
    orderBy: 'asc' | 'desc'
    limit: number
}
