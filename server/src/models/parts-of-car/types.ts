import {Optional} from "sequelize/types";

export interface PartsOfCarAttributes {
    id: number
    name: string
    typeCarId?: number
}
  
export interface PartsOfCarCreation extends Optional<PartsOfCarAttributes, 'id'> {}