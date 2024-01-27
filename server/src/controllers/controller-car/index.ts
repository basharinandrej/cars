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
            const authorization = req.get('Authorization')
            const dtoCarCreation = dtoCar.getDtoCarCreation(req.body, authorization)
            const car = await serviceCar.createCar(dtoCarCreation, next)

            res.send(car)
        } catch (error) {
            next(ApiError.internal(error))

        }
    }

    async getAllCars(req: RequestGetAll<ParamsGetAllCars>, res: Response, next: NextFunction) {
        try {
            const dtoCarGetAll = dtoCar.getDtoGetAllCars(req.query)
            const cars = await serviceCar.getAllCars(dtoCarGetAll, next)

            res.send(cars)
        } catch (error) {
            next(ApiError.internal(error))

        }
    }

    async getByVINCodeCar(req: RequestGetOne<ParamsGetOneCar>, res: Response, next: NextFunction) {
        try {
            const dtoCarGetByVinCode = dtoCar.getDtoCarByVinCode(req.query)
            const car = await serviceCar.getByVINCodeCar(dtoCarGetByVinCode, next)

            if(car) {
                res.send(car)
            }
        } catch (error) {
            next(ApiError.internal(error))

        }
    }
}

export default new Car()