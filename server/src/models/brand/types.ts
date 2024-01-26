import {Optional} from "sequelize/types";
import Model from '@models/model'

export interface BrandAttributes {
    id: number
    name: string
    
    Models?: Model[]
}
  
export interface BrandCreation extends Optional<BrandAttributes, 'id'> {}