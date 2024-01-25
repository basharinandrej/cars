import {NextFunction} from 'express'
import {DtoModelCreation, DtoModelGetAll, DtoModelGetById} from '@dtos/dto-model/types'
import Model from '@models/model'
import Brand from '@models/brand'
import ApiError from '@api-error/index'
import Detail from '@models/detail'
import {mapperModelCreation} from './model-mappers/mapper-model-creation'
import {mapperModelGetAll} from './model-mappers/mapper-model-get-all'
import {mapperModelGetById} from './model-mappers/mapper-model-get-by-id'

class ServiceModel {
    async createModel(dtoModelCreation: DtoModelCreation, next: NextFunction) {

        try {
            const model = await Model.create({
                name: dtoModelCreation.name,
                brandId: dtoModelCreation.brandId,
            })
            return mapperModelCreation(model)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }


    async getAllModels(dtoModelsGetAll: DtoModelGetAll, next: NextFunction) {

        try {
            const models = await Model?.findAndCountAll({
                limit: dtoModelsGetAll.limit,
                offset: dtoModelsGetAll.offset,
                where: {
                    brandId: dtoModelsGetAll.brandId
                },
                include: [Brand]
            })
            return mapperModelGetAll(models)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getByIdModel(dtoModelGetById: DtoModelGetById, next: NextFunction) {

        //pagination, filters, sorts
        try {
            const model = await Model.findOne({
                where: {
                    id: dtoModelGetById.id
                    
                },
                include: Detail
            })
            return mapperModelGetById(model)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}


export default new ServiceModel()