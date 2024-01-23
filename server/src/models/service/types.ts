import {Optional} from "sequelize/types";

export interface ServiceAttributes {
    id: number
    name: string
    description: string
    price: number
}


export interface CreationService extends Optional<ServiceAttributes, 'id'> {}