import {NextFunction, Response} from 'express'
import {CreateModelDto, GetModelsDto} from '@common/dtos'
import Model from '@models/model'
import TypeCar from '@models/type-car'
import Brand from '@models/brand'
import ApiError from '@api-error/index'


class ServiceModel {
    async createModel(createModelDto: CreateModelDto, res: Response, next: NextFunction) {

        try {
            const model = await Model.create({
                name: createModelDto.name,
                brandId: createModelDto.brandId,
                typeCarId: createModelDto.typeCarId
            })
            res.send({model})
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
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