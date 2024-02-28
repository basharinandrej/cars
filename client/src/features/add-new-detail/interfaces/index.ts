import { DetailWears } from "@shared"

export interface FormAddNewDetailValueTypes {
    name: string
    vendorCode: string
    wear: DetailWears
    price: number
    modelId: number
    detailCategoryId: number
    year: number
}

export interface DetailCategory {
    label: string
    value: number
}

export interface DetailCategoryResponse {
    items: DetailCategory[]
    total: number
}

export interface Model {
    label: string
    value: number
}

export interface ModelsResponse {
    items: Model[]
    total: number
}
  