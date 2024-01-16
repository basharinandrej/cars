import {Response} from 'express'
import serviceTypeCar from '@services/service-type-car'
import {CreateTypeCarRequest, GetTypesCarRequest} from '@routers/router-type-car/types'
import {CreateTypeCarDto, GetTypesCarDto} from '@common/dto'


class ControllerTypeCar {
    async createTypeCar(req: CreateTypeCarRequest , res: Response) {
        try {
            const createTypeCarDto: CreateTypeCarDto = {
                name: req.body.name
            }

            serviceTypeCar.createTypeCar(createTypeCarDto, res)
        } catch (error) {
            
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