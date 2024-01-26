import {Optional} from "sequelize/types";

export interface DetailAddressAttributes {
    id: number
    city: string
    street: string
    house: string
}

export interface DetailAddressCreation extends Optional<DetailAddressAttributes, 'id'> {}