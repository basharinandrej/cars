import {Optional} from "sequelize/types";

export interface AddressAttributes {
    id: number
    city: string
    street: string
    house: number
}

export interface AddressCreation extends Optional<AddressAttributes, 'id'> {}