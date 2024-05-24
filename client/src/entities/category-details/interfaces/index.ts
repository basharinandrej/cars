export interface CategoryDetail {
    id: number
    name: string
}
export interface CategoryDetailsResponse {
    count: number
    rows: CategoryDetail[]
}

export interface FormAddNewCategoryDetailValueTypes {
    name: string
}