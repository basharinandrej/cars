import {NextFunction, Response} from 'express'
import {CreateTypeCarDto, GetTypesCarDto} from '@common/dtos'
import TypeCar from '@models/type-car'
import PartsOfCar from '@models/parts-of-car'
import ApiError from '@api-error/index'
import {errorStrings} from '@common/error-strings'
import {createTypeCarMapper} from './type-car-mapper/create-type-car-mapper'

class ServiceTypeCar {
    async createTypeCar(createTypeCar: CreateTypeCarDto, next: NextFunction) {
        try {
            const candidate = await TypeCar.findOne({
                where: {
                    name: createTypeCar.name
                }
            })

            if(candidate) {
                return next(ApiError.bedRequest(errorStrings.typeCarAlreadyExist(candidate.dataValues.name)))
            }

            const typeCar =  await TypeCar.create({
                name: createTypeCar.name
            })
            return createTypeCarMapper(typeCar)
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