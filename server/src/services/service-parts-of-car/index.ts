import {Response} from 'express'
import {CreatePartsOfCarDto, GetPartsOfCarsDto} from '@common/dtos'
import PartsOfCar from '@models/parts-of-car'
import TypeDetail from '@models/type-detail'


class ServicePartsOfCar {
    async createPartsOfCar(createPartsOfCarDto: CreatePartsOfCarDto, res: Response) {

        const partsOfCar = await PartsOfCar.create({
            name: createPartsOfCarDto.name
        })
        res.send({partsOfCar})
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