import {State} from '@common/enums'
import {Optional} from "sequelize/types";

export interface DetailAttributes {
    id: number
    name: string
    vendorCode: string
    year: number
    description: string
    price: number
    state: State

    modelId?: number
    userId?: number
    detailCategoryId?: number
    detailWearId?: number
    detailAddressId?: number
}


export interface CreationDetail extends Optional<DetailAttributes, 'id'> {}