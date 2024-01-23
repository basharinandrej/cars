import { Request } from "express";
import {EmptyString} from '@common/types'
import { CarAttributes } from "@models/car/types";

export interface CreateCarRequest extends Request<Record<string, unknown>, EmptyString, CarAttributes> {}

export interface GetCars {
    limit?: number,
    offset?: number
}
export interface GetCarsRequest extends Request<Record<string, unknown>, EmptyString, EmptyString, GetCars> {}


export interface GetByVINCodeCar {
    vinCode: string
}

export interface GetByVINCodeCarRequest extends Request<Record<string, unknown>, EmptyString, EmptyString, GetByVINCodeCar> {}