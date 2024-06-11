import { NextFunction, Response } from "express";
import serviceCar from '@services/service-car'
import { CarAttributes } from "@models/car/types";
import {ParamsGetAllCars, ParamsDeleteCar, ParamsGetOneCar} from './types'
import dtoCar from "@dtos/dto-car/dto-car";
import { RequestCreation, RequestDelete, RequestGetAll, RequestGetOne } from "@common/types";
import ApiError from "@api-error/index";


class Car {
    async createCar(req: RequestCreation<CarAttributes>, res: Response, next: NextFunction) {
        try {
            //@ts-ignore
            const dtoCarCreation = dtoCar.getDtoCarCreation(req.body, req.cookies)
            const car = await serviceCar.createCar(dtoCarCreation, next)

            res.status(200).send(car)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'Car.createCar'))
            }
        }
    }

    async updateCar(req: RequestCreation<CarAttributes>, res: Response, next: NextFunction) {
        try {
            const dtoCarUpdation = dtoCar.getDtoCarUpdation(req.body)
            const car = await serviceCar.updateCar(dtoCarUpdation, next)

            res.status(200).send(car)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'Car.updateCar'))
            }
        }
    }

    async getAllCars(req: RequestGetAll<ParamsGetAllCars>, res: Response, next: NextFunction) {
        try {
            const dtoCarGetAll = dtoCar.getDtoGetAllCars(req.query)
            const cars = await serviceCar.getAllCars(dtoCarGetAll, next)

            res.status(200).send(cars)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'Car.getAllCars'))
            }
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
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'Car.getByVINCodeCar'))
            }
        }
    }

    async dropCar(req: RequestDelete<ParamsDeleteCar>, res: Response, next: NextFunction) {
        try {
            const vinCode = await serviceCar.dropCar(req.query.vinCode, next)
            res.send(vinCode)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'Car.dropCar'))
            }
        }
    }
}

export default new Car()