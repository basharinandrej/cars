import { NextFunction } from "express";
import { DtoCarCreation, DtoCarGetAll, DtoCarGetByVinCode } from "@dtos/dto-car/types";
import Car from "@models/car";
import ApiError from "@api-error/index";
import {mapperCarCreation} from './car-mappers/mapper-car-creation'
import {mapperCarGetAll} from './car-mappers/mapper-car-get-all'
import {mapperCarGetByVinCode} from './car-mappers/mapper-car-get-by-vin-code'


class ServiceCar {
    async createCar(dtoCarCreatio: DtoCarCreation, next: NextFunction) {

        try {
            const car = await Car.create({
                vinCode: dtoCarCreatio.vinCode.toLocaleLowerCase(),
                color: dtoCarCreatio.color,
                year: dtoCarCreatio.year,
                brand: dtoCarCreatio.brand,
                model: dtoCarCreatio.model
            })

            return mapperCarCreation(car)
        } catch (error) {
            next(ApiError.internal(error))
        }
    }

    async getAllCars({limit, offset}: DtoCarGetAll, next: NextFunction) {
        try {
            const cars = await Car.findAndCountAll({
                limit, offset
            })

            return mapperCarGetAll(cars)
        } catch (error) {
            
        }
    }

    async getByVINCodeCar({vinCode}: DtoCarGetByVinCode,  next: NextFunction) {
        try {
            const car = await Car.findOne({
                where: {vinCode}
            })
            return mapperCarGetByVinCode(car)
        } catch (error) {
            
        }
    }
}

export default new ServiceCar()