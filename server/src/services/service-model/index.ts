import {Response} from 'express'
import {CreateModelDto, GetModelsDto} from '@common/dtos'
import Model from '@models/model'
import TypeCar from '@models/type-car'
import Brand from '@models/brand'


class ServiceModel {
    async createModel(createModelDto: CreateModelDto, res: Response) {

        const model = await Model.create({
            name: createModelDto.name,
            brandId: createModelDto.brandId,
            typeCarId: createModelDto.typeCarId
        })
        res.send({model})
    }


    async getAllModels(getModelsDto: GetModelsDto, res: Response) {

        const models = await Model?.findAndCountAll({
            limit: getModelsDto.limit,
            offset: getModelsDto.offset,
            include: [TypeCar,Brand]
        })
        res.send({models})
    }
}


export default new ServiceModel()