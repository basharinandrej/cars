import {StateDetail} from '@common/enums'
import {Optional} from "sequelize/types";

export interface DetailAttributes {
    id: number
    name: string
    vendorCode: string
    year: number
    description: string
    price: number
    state: StateDetail

    modelId?: number
    userId?: number
    detailCategoryId?: number
    detailWearId?: number
    detailAddressId?: number
}


export interface CreationDetail extends Optional<DetailAttributes, 'id'> {}