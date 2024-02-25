import { NextFunction, Response } from "express";
import serviceCar from '@services/service-car'
import { CarAttributes } from "@models/car/types";
import {ParamsGetAllCars, ParamsGetOneCar} from './types'
import dtoCar from "@dtos/dto-car/dto-car";
import { RequestCreation, RequestGetAll, RequestGetOne } from "@common/types";
import ApiError from "@api-error/index";


class Car {
    async createCar(req: RequestCreation<CarAttributes>, res: Response, next: NextFunction) {
        try {
            const dtoCarCreation = dtoCar.getDtoCarCreation(req.body, req.cookies)
            const car = await serviceCar.createCar(dtoCarCreation, next)

            res.status(200).send(car)
        } catch (error) {
            next(ApiError.internal(error))
        }
    }

    async getAllCars(req: RequestGetAll<ParamsGetAllCars>, res: Response, next: NextFunction) {
        try {
            const dtoCarGetAll = dtoCar.getDtoGetAllCars(req.query)
            const cars = await serviceCar.getAllCars(dtoCarGetAll, next)

            res.status(200).send(cars)
        } catch (error) {
            next(ApiError.internal(error))
        }
    }

    async getByVINCodeCar(req: RequestGetOne<ParamsGetOneCar>, res: Response, next: NextFunction) {
        try {
            const dtoCarGetByVinCode = dtoCar.getDtoCarByVinCode(req.query)
            const car = await serviceCar.getByVINCodeCar(dtoCarGetByVinCode, next)

            if(car) {
                res.status(200).send(car)
            }
        } catch (error) {
            next(ApiError.internal(error))
        }
    }

    async dropCar(req: any, res: Response, next: NextFunction) {
        try {
            const vinCode = await serviceCar.dropCar(req.query.vinCode, next)
            res.send(vinCode)
        } catch (error) {
            next(ApiError.internal(error))
        }
    }
}

export default new Car()