import { NextFunction, Response } from "express";
import serviceCar from '@services/service-car'
import {CreateCarRequest, GetByVINCodeCarRequest, GetCarsRequest} from '@routers/router-car/types'
import dtoCar from "@dtos/dto-car/dto-car";


class Car {
    async createCar(req: CreateCarRequest, res: Response, next: NextFunction) {

        try {
            const dtoCarCreation = dtoCar.getDtoCarCreation(req.body)
            const car = await serviceCar.createCar(dtoCarCreation, next)

            res.send(car)
        } catch (error) {
            
        }
    }

    async getAllCars(req: GetCarsRequest, res: Response, next: NextFunction) {
        try {
            const dtoCarGetAll = dtoCar.getDtoCars(req.query)
            const cars = await serviceCar.getAllCars(dtoCarGetAll, next)

            res.send(cars)
        } catch (error) {
            
        }
    }

    async getByVINCodeCar(req: GetByVINCodeCarRequest, res: Response, next: NextFunction) {
        try {
            const dtoCarGetByVinCode = dtoCar.getDtoCarByVinCode(req.query)
            const car = await serviceCar.getByVINCodeCar(dtoCarGetByVinCode, next)
            res.send(car)
        } catch (error) {
            
        }
    }
}

export default new Car()