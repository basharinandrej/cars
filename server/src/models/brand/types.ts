import {Optional} from "sequelize/types";

export interface BrandAttributes {
    id: number
    name: string
}
  
export interface BrandCreation extends Optional<BrandAttributes, 'id'> {}