export interface CategoryService {
    id: number
    name: string
}
export interface CategoryServicesResponse {
    total: number
    items: CategoryService[]
}

export interface FormAddNewCategoryServiceValueTypes {
    name: string
}