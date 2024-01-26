import {Optional} from "sequelize/types";

export interface AddressAttributes {
    id: number
    city: string
    street: string
    house: string
}

export interface AddressCreation extends Optional<AddressAttributes, 'id'> {}