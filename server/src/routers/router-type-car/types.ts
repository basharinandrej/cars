import { Request } from "express";
import { TypeCarAttributes } from '@models/type-car/types'
import {EmptyString} from '@common/types'

export interface CreateTypeCarRequest extends Request<EmptyString, EmptyString, TypeCarAttributes> {}

interface GetTypeCar {
    limit?: number,
    offset?: number
}
export interface GetTypeCarRequest extends Request<EmptyString, EmptyString, EmptyString, GetTypeCar> {}
