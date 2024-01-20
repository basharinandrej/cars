import {NextFunction, Response} from 'express'
import serviceTypeCar from '@services/service-type-car'
import {CreateTypeCarRequest, GetTypesCarRequest} from '@routers/router-type-car/types'
import {GetTypesCarDto} from '@common/dtos'
import ApiError from '@api-error/index'
import dtoTypeCar from '@dtos/dto-type-car'

class ControllerTypeCar {
    async createTypeCar(req: CreateTypeCarRequest, res: Response, next: NextFunction) {
        try {
            const createTypeCarDto = dtoTypeCar.createTypeCarDto(req.body)
            const serviceType = await serviceTypeCar.createTypeCar(createTypeCarDto, next)
            
            res.send({serviceType})
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAllTypesCar(req: GetTypesCarRequest, res: Response) {
        try {
            const getTypesCarDto: GetTypesCarDto = {
                limit: req.query.limit,
                offset: req.query.offset
            }

            serviceTypeCar.getAllTypesCar(getTypesCarDto, res)
        } catch (error) {
            
        }
    }
}

export default new ControllerTypeCar()