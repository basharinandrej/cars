import {Response} from 'express'
import {CreatePartsOfCarDto, GetPartsOfCarsDto} from '@common/dtos'
import PartsOfCar from '@models/parts-of-car'
import Model from '@models/model'


class ServicePartsOfCar {
    async createPartsOfCar(createPartsOfCarDto: CreatePartsOfCarDto, res: Response) {

        const partsOfCar = await PartsOfCar.create({
            name: createPartsOfCarDto.name
        })
        res.send({partsOfCar})
    }


    async getAllPartsOfCars(getPartsOfCarsDto: GetPartsOfCarsDto, res: Response) {

        const PartsOfCars = await PartsOfCar?.findAndCountAll({
            limit: getPartsOfCarsDto.limit,
            offset: getPartsOfCarsDto.offset,
            include: Model
        })
        res.send({PartsOfCars})
    }
}


export default new ServicePartsOfCar()