export interface CategoryDetail {
    id: number
    name: string
}
export interface CategoryDetailsResponse {
    total: number
    items: CategoryDetail[]
}

export interface FormAddNewCategoryDetailValueTypes {
    name: string
}