import {NextFunction} from 'express'
import {DtoModelCreation, DtoModelGetAll, DtoModelGetById} from '@dtos/dto-model/types'
import Model from '@models/model'
import Brand from '@models/brand'
import ApiError from '@api-error/index'
import Detail from '@models/detail'
import { errorStrings } from '@common/error-strings'

class ServiceModel {
    async createModel(dtoModelCreation: DtoModelCreation, next: NextFunction) {

        try {
            const brandCandidate = await Brand.findOne({
                where: {
                    id: dtoModelCreation.brandId
                }
            })

            if(!brandCandidate) {
                return next(ApiError.bedRequest(errorStrings.notFoundBrand(dtoModelCreation.brandId)))
            }

            const model = await Model.create({
                name: dtoModelCreation.name,
                brandId: dtoModelCreation.brandId,
            })
            return model
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceModel.createModel'))
            }
        }
    }

    async getAllModels(dtoModelsGetAll: DtoModelGetAll, next: NextFunction) {

        try {
            const params: Partial<DtoModelGetAll> = {}
            if(dtoModelsGetAll.brandId) params.brandId = dtoModelsGetAll.brandId

            const models = await Model?.findAndCountAll({
                limit: dtoModelsGetAll.limit,
                offset: dtoModelsGetAll.offset,
                where: params,
                attributes: ['id', 'name'],
                include: [{
                    model: Brand,
                    as: 'brand',
                    attributes: ['id', 'name']
                }]
            })
            return models
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceModel.getAllModels'))
            }
        }
    }

    async getByIdModel(dtoModelGetById: DtoModelGetById, next: NextFunction) {

        try {
            const model = await Model.findOne({
                where: {
                    id: dtoModelGetById.id
                },
                attributes: ['id', 'name'],
                include: [
                    {
                        model: Brand,
                        as: 'brand',
                        attributes: ['id', 'name']
                    },
                    {
                        model: Detail,
                        as: 'details'
                    }]
            })
            if(!model) {
                return next(ApiError.bedRequest(errorStrings.notFoundModel(dtoModelGetById.id)))
            }
            return model
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceModel.getByIdModel'))
            }
        }
    }

    async dropModel(id: number, next: NextFunction) {
        try {
            const result = await Model.destroy({
                where: {id},
            })
            return result ? id : false
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceModel.dropModel'))
            }
        }
    }
}


export default new ServiceModel()