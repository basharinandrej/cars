import {Optional} from "sequelize/types";
import {BrandAttributes} from "@models/brand/types"
import { DetailAttributes } from "@models/detail/types";

export interface ModelAttributes {
    id: number
    name: string


    Brand?: BrandAttributes,
    Details?: Array<DetailAttributes>

    
    brandId?: number,
}
  
export interface ModelCreation extends Optional<ModelAttributes, 'id'> {}