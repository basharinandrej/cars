import { DetailWears } from "@common/enums";
import {Optional} from "sequelize/types";

export interface DetailAttributes {
    id: number
    name: string
    vendorCode: string
    year: number
    description: string
    price: number
    wear: DetailWears

    modelId?: number
    userId?: number
    detailCategoryId?: number
    addressId?: number
}


export interface CreationDetail extends Optional<DetailAttributes, 'id'> {}