
export interface DtoServiceCreation {
    name: string,
    description: string
    price: number
    userId: number
    serviceCategoryId: number
}

export interface DtoServiceGetAll {
    limit: number
    offset: number
    serviceCategoryId: number
}
