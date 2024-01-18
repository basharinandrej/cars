import {Optional} from "sequelize/types";
import {BrandAttributes} from "@models/brand/types"
import {TypeCarAttributes} from "@models/type-car/types"

export interface ModelAttributes {
    id: number
    name: string
    brandId?: number,
    Brand?: BrandAttributes,
    typeCarId?: number
    TypeCar?: TypeCarAttributes
}
  
export interface ModelCreation extends Optional<ModelAttributes, 'id'> {}