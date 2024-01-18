import { Request } from "express";
import { PartsOfCarAttributes } from '@models/parts-of-car/types'
import {EmptyString} from '@common/types'

export interface CreatePartsOfCarRequest extends Request<Record<string, unknown>, EmptyString, PartsOfCarAttributes> {}

interface GetPartsOfCar {
    limit?: number,
    offset?: number
}

export interface GetPartsOfCarRequest extends Request<EmptyString, EmptyString, EmptyString, GetPartsOfCar> {}
