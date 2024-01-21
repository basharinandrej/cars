import {Optional} from "sequelize/types";

export interface WearAttributes {
    id: number
    name: string
    description: string
}

export interface WearCreation extends Optional<WearAttributes, 'id'> {}