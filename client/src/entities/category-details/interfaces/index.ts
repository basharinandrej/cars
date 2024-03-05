export interface CategoryDetail {
    id: number
    name: string
}
export interface CategoryDetailsResponse {
    total: number
    items: CategoryDetail[]
}

// export interface FormAddNewCarValueTypes {
//     vinCode: string
//     brand: string
//     model: string
//     color: string
//     year: string
// }