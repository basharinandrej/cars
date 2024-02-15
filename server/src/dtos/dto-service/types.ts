
export interface DtoOrganizationServiceCategoryCreation {
    name: string,
    description: string
    price: number
    organizationId: number
    serviceCategoryId: number
}

export interface DtoOrganizationServiceCategoryGetAll {
    limit: number
    offset: number
    serviceCategoryId: number
}
