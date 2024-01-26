import {Optional} from "sequelize/types";

export interface DetailWearAttributes {
    id: number
    name: string
    description: string
}

export interface DetailWearCreation extends Optional<DetailWearAttributes, 'id'> {}