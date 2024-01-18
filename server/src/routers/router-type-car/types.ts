import { Request } from "express";
import { TypeCarAttributes } from '@models/type-car/types'
import {EmptyString} from '@common/types'

export interface CreateTypeCarRequest extends Request<Record<string, unknown>, EmptyString, TypeCarAttributes> {}

interface GetTypeCar {
    limit?: number,
    offset?: number
}
export interface GetTypesCarRequest extends Request<EmptyString, EmptyString, EmptyString, GetTypeCar> {}
