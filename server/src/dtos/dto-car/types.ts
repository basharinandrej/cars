import { Pagination } from "@common/types"

export interface DtoCarCreation {
    vinCode: string,
    brand: string,
    model: string,
    year: number,
    color: string
    userId: number
}

export interface DtoCarUpdation {
    vinCode: string,
    brand: string,
    model: string,
    year: number,
    color: string
}


export interface DtoCarGetAll extends Pagination{}

export interface DtoCarGetByVinCode {
    vinCode: string
}