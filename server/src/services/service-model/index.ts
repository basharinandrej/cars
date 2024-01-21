import {NextFunction} from 'express'
import {CreateModelDto, GetAllModelsDto} from '@dtos/dto-model/types'
import Model from '@models/model'
import Brand from '@models/brand'
import ApiError from '@api-error/index'
import Detail from '@models/detail'
import {mapperCreateModel} from './model-mappers/create-mapper'
import {mapperGetAllModel} from './model-mappers/get-all-mapper'
import {getOneModelMapper} from './model-mappers/get-one-model-mapper'

class ServiceModel {
    async createModel(createModelDto: CreateModelDto, next: NextFunction) {

        try {
            const model = await Model.create({
                name: createModelDto.name,
                brandId: createModelDto.brandId,
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
                include: [Brand]
            })
            return mapperGetAllModel(models)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getOneModel(modelId: number, next: NextFunction) {

        //pagination, filters, sorts
        try {
            const model = await Model.findOne({
                where: {
                    id: modelId
                    
                },
                include: Detail
            })
            return getOneModelMapper(model)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}


export default new ServiceModel()