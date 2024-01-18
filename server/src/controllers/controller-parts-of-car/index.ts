import {NextFunction, Response} from 'express'
import servicePartsOfCar from '@services/service-parts-of-car'
import {CreatePartsOfCarRequest, GetPartsOfCarRequest} from '@routers/router-parts-of-car/types'
import {CreatePartsOfCarDto, GetPartsOfCarsDto} from '@common/dtos'
import ApiError from '@api-error/index'


class ControllerPartsOfCar {
    async createPartsOfCar(req: CreatePartsOfCarRequest, res: Response, next: NextFunction) {
        try {
            const createPartsOfCarDto: CreatePartsOfCarDto = {
                name: req.body.name,
                typeCarId: req.body.typeCarId
            }

            servicePartsOfCar.createPartsOfCar(createPartsOfCarDto, res, next)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAllPartsOfCars(req: GetPartsOfCarRequest, res: Response) {
        try {
            const getPartsOfCarsDto: GetPartsOfCarsDto = {
                limit: req.query.limit,
                offset: req.query.offset
            }

            servicePartsOfCar.getAllPartsOfCars(getPartsOfCarsDto, res)
        } catch (error) {
            
        }
    }
}

export default new ControllerPartsOfCar()