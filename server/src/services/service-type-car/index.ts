import {NextFunction, Response} from 'express'
import {CreateTypeCarDto, GetTypesCarDto} from '@common/dtos'
import TypeCar from '@models/type-car'
import PartsOfCar from '@models/parts-of-car'
import ApiError from '@api-error/index'


class ServiceTypeCar {
    async createTypeCar(createTypeCar: CreateTypeCarDto, res: Response, next: NextFunction) {
        try {
            const typeCar = await TypeCar.create({
                name: createTypeCar.name
            })
            res.send({ typeCar })
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }

    }


    async getAllTypesCar(getTypesCarDto: GetTypesCarDto, res: Response) {

        const typesCar= await TypeCar?.findAndCountAll({
            limit: getTypesCarDto.limit,
            offset: getTypesCarDto.offset,
            include: PartsOfCar
        })
        res.send({typesCar})
    }
}


export default new ServiceTypeCar()