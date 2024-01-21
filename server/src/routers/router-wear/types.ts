import { Request } from "express";
import { WearAttributes } from '@models/wear/types'
import {EmptyString} from '@common/types'

export interface CreateWearRequest extends Request<Record<string, unknown>, EmptyString, WearAttributes> {}

export interface GetWears {
    limit?: number,
    offset?: number
}
export interface GetWearsRequest extends Request<Record<string, unknown>, EmptyString, EmptyString, GetWears> {}


export interface GetByIdWear {
    id: number
}

export interface GetByIdWearRequest extends Request<Record<string, unknown>, EmptyString, EmptyString, GetByIdWear> {}
