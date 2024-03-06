import { NextFunction } from "express";
import { DtoCarCreation, DtoCarUpdation, DtoCarGetAll, DtoCarGetByVinCode } from "@dtos/dto-car/types";
import Car from "@models/car";
import User from "@models/user";
import ApiError from "@api-error/index";
import {mapperCarCreation} from './car-mappers/mapper-car-creation'
import {mapperCarGetAll} from './car-mappers/mapper-car-get-all'
import {mapperCarGetByVinCode} from './car-mappers/mapper-car-get-by-vin-code'
import { errorStrings } from "@common/error-strings";
import { where } from "sequelize";


class ServiceCar {
    async createCar(dtoCarCreatio: DtoCarCreation, next: NextFunction) {

        try {
            const car = await Car.create({
                vinCode: dtoCarCreatio.vinCode.toLocaleLowerCase(),
                color: dtoCarCreatio.color,
                year: dtoCarCreatio.year,
                brand: dtoCarCreatio.brand,
                model: dtoCarCreatio.model,
                userId: dtoCarCreatio.userId
            })

            return mapperCarCreation(car)
        } catch (error) {
            next(ApiError.internal(error))
        }
    }

    async updateCar(dtoCarUpdation: DtoCarUpdation, next: NextFunction) {

        try {
            const result = await Car.update({
                vinCode: dtoCarUpdation.vinCode.toLocaleLowerCase(),
                color: dtoCarUpdation.color,
                year: dtoCarUpdation.year,
                brand: dtoCarUpdation.brand,
                model: dtoCarUpdation.model,
            }, {where: {vinCode: dtoCarUpdation.vinCode.toLocaleLowerCase()}})

            return result ? 'updated' : false
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
            next(ApiError.internal(error))
        }
    }

    async getByVINCodeCar({vinCode}: DtoCarGetByVinCode,  next: NextFunction) {
        try {
            const car = await Car.findOne({
                where: {vinCode},
                include: User
            })
            if(!car) {
                return next(ApiError.bedRequest(errorStrings.notFoundCar(vinCode)))
            }
            return mapperCarGetByVinCode(car)
        } catch (error) {
            next(ApiError.internal(error))
        }
    }

    async dropCar(vinCode: string, next: NextFunction) {
        try {
            const result = await Car.destroy({
                where: {vinCode},
            })
            return result ? vinCode : false
        } catch (error) {
            next(ApiError.internal(error))

        }
    }
}

export default new ServiceCar()