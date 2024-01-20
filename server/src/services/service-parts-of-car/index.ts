import {NextFunction, Response} from 'express'
import {CreatePartsOfCarDto, GetPartsOfCarsDto} from '@common/dtos'
import PartsOfCar from '@models/parts-of-car'
import TypeDetail from '@models/type-detail'
import ApiError from '@api-error/index'
import {createPartsOfCarMappers} from './parts-of-car-mappers/create-parts-of-car-mapper'

class ServicePartsOfCar {
    async createPartsOfCar(createPartsOfCarDto: CreatePartsOfCarDto, next: NextFunction) {

        try {
            const partsOfCar = await PartsOfCar.create({
                name: createPartsOfCarDto.name,
                typeCarId: createPartsOfCarDto.typeCarId
            })
            
            return createPartsOfCarMappers(partsOfCar)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }

    }


    async getAllPartsOfCars(getPartsOfCarsDto: GetPartsOfCarsDto, res: Response) {

        const partsOfCars = await PartsOfCar?.findAndCountAll({
            limit: getPartsOfCarsDto.limit,
            offset: getPartsOfCarsDto.offset,
            include: TypeDetail
        })
        res.send({partsOfCars})
    }
}


export default new ServicePartsOfCar()