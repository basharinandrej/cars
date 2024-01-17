import {Response} from 'express'
import {CreateTypeCarDto, GetTypesCarDto} from '@common/dtos'
import TypeCar from '@models/type-car'
import PartsOfCar from '@models/parts-of-car'


class ServiceTypeCar {
    async createTypeCar(createTypeCar: CreateTypeCarDto, res: Response) {

        const typeCar = await TypeCar.create({
            name: createTypeCar.name
        })
        res.send({ typeCar })
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