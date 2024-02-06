

export interface ParamsFetchListingDetails {
    limit: number
    offset: number
    categoryId?: number
    modelId?: number
    keyword?: string
}

export interface ParamsFetchSearchDetails  extends Record<string, string>{
    keyword: string
}

export interface ParamsFetchListingBrand {
    sortBy: 'name',
    orderBy: 'asc' | 'desc'
    keyword?: string
}


export interface ParamsFetchListingModel {
    brandId: number
}

