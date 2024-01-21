import {State} from '@common/enums'
import {Optional} from "sequelize/types";

export interface DetailAttributes {
    id: number
    name: string
    vendorCode: string
    wear: number
    year: number
    description: string
    price: number
    photos: number
    state: State
    typeDetailId?: number
    modelId?: number
    categoryId?: number
    wearId?: number
}


export interface CreationDetail extends Optional<DetailAttributes, 'id'> {}