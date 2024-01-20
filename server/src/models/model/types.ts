import {Optional} from "sequelize/types";
import {BrandAttributes} from "@models/brand/types"
import {TypeCarAttributes} from "@models/type-car/types"
import { DetailAttributes } from "@models/detail/types";

export interface ModelAttributes {
    id: number
    name: string
    brandId?: number,
    Brand?: BrandAttributes,
    typeCarId?: number
    TypeCar?: TypeCarAttributes
    Details?: Array<DetailAttributes>
}
  
export interface ModelCreation extends Optional<ModelAttributes, 'id'> {}