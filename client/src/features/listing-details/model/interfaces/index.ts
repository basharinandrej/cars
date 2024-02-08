

export interface ParamsFetchListingDetails extends Record<string, string|number>{
    limit: number
    offset: number
    categoryId?: number
    modelId?: number
    keyword?: string
}

export interface ParamsFetchSearchDetails  extends Record<string, string|number>{
    keyword: string
    modelId?: number
}

export interface ParamsFetchListingBrand {
    sortBy: 'name',
    orderBy: 'asc' | 'desc'
    keyword?: string
    limit: number
}


export interface ParamsFetchListingModel {
    brandId: number
    limit: number
}

