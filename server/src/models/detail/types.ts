import {State} from '@common/enums'
import {Optional} from "sequelize/types";

export interface DetailAttributes {
    id: number
    name: string
    vendorCode: number
    wear: number
    year: number
    description: string
    price: number
    photos: number
    state: State
    typeDetailId?: number
    modelId?: number
}


export interface CreationDetail extends Optional<DetailAttributes, 'id'> {}