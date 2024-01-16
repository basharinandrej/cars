import {Optional} from "sequelize/types";

export interface TypeDetailAttributes {
    id: number
    name: string
    partsOfCarId?: number
}

export interface TypeDetailCreation extends Optional<TypeDetailAttributes, 'id'> {}