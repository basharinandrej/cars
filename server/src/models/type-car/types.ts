import {Optional} from "sequelize/types";

export interface TypeCarAttributes {
    id: number
    name: string
}

export interface TypeCarCreation extends Optional<TypeCarAttributes, 'id'> {}