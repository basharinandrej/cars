import { DetailWears } from "@shared"

export interface FormAddNewDetailValueTypes {
    name: string
    vendorCode: string
    wear: DetailWears
    price: number
    modelId: number
    detailCategoryId: number
    year: string
}

export interface DetailCategory {
    label: string
    value: number
}

export interface DetailCategoryResponse {
    rows: DetailCategory[]
    count: number
}

export interface Model {
    label: string
    value: number
}

export interface ModelsResponse {
    rows: Model[]
    count: number
}
  