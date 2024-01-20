import {NextFunction} from 'express'
import {CreateModelDto, GetAllModelsDto} from '@common/dtos'
import Model from '@models/model'
import TypeCar from '@models/type-car'
import Brand from '@models/brand'
import ApiError from '@api-error/index'
import {mapperCreateModel} from './model-mappers/create-mapper'
import {mapperGetAllModel} from './model-mappers/get-all-mapper'

class ServiceModel {
    async createModel(createModelDto: CreateModelDto, next: NextFunction) {

        try {
            const model = await Model.create({
                name: createModelDto.name,
                brandId: createModelDto.brandId,
                typeCarId: createModelDto.typeCarId
            })
            return mapperCreateModel(model)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }


    async getAllModels(getModelsDto: GetAllModelsDto, next: NextFunction) {

        try {
            const models = await Model?.findAndCountAll({
                limit: getModelsDto.limit,
                offset: getModelsDto.offset,
                where: {
                    brandId: getModelsDto.brandId
                },
                include: [TypeCar,Brand]
            })
            return mapperGetAllModel(models)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}


export default new ServiceModel()