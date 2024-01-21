import {Optional} from "sequelize/types";
import {BrandAttributes} from "@models/brand/types"
import { DetailAttributes } from "@models/detail/types";

export interface ModelAttributes {
    id: number
    name: string
    brandId?: number,
    Brand?: BrandAttributes,
    typeCarId?: number
    Details?: Array<DetailAttributes>
}
  
export interface ModelCreation extends Optional<ModelAttributes, 'id'> {}