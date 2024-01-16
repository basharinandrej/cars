import {Optional} from "sequelize/types";


export interface ModelAttributes {
    id: number
    name: string
    brandId?: number,
    typeCarId?: number
}
  
export interface ModelCreation extends Optional<ModelAttributes, 'id'> {}