import { Pagination } from "@common/types";


export interface DtoServiceCategoryCreation {
    name: string,
    description: string
}

export interface DtoServiceCategoryGetAll extends Pagination{}


export interface DtoCategoryServiceUpdation {
    id: number
    name: string,
}
