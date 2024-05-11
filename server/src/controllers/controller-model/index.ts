import {NextFunction, Response} from 'express'
import serviceModel from '@services/service-model'
import ApiError from '@api-error/index'
import dtoModel from '@dtos/dto-model/dto-model'
import {RequestCreation, RequestGetAll, RequestGetOne, RequestDelete} from '@common/types'
import { ModelAttributes } from '@models/model/types'
import { ParamsGetAllModels, ParamsGetOneModel, ParamsDeleteModel } from './types'


class ControllerModel {
    async createModel(req: RequestCreation<ModelAttributes>, res: Response, next: NextFunction) {
        try {
            const dtoModelCreation = dtoModel.getDtoModelCreation(req.body)
            const model = await serviceModel.createModel(dtoModelCreation, next)
            
            res.send(model)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerModel.createModel'))
            }
        }
    }

    async getAllModels(req: RequestGetAll<ParamsGetAllModels>, res: Response, next: NextFunction) {
        try {
            const dtoModelsGetAll = dtoModel.getDtoModelsGetAll(req.query)
            const models = await serviceModel.getAllModels(dtoModelsGetAll, next)

            res.send(models)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerModel.getAllModels'))
            }
        }
    }

    async getByIdModel(req: RequestGetOne<ParamsGetOneModel>, res: Response, next:NextFunction) {
        try {
            const dtoModelGetById = dtoModel.getDtoModelGetById(req.query)
            const models = await serviceModel.getByIdModel(dtoModelGetById, next)

            res.send(models)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerModel.getByIdModel'))
            }
        }
    }

    async dropModel(req: RequestDelete<ParamsDeleteModel>, res: Response, next: NextFunction) {
        try {
            const id = await serviceModel.dropModel(req.query.id, next)
            res.send(id)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerModel.dropModel'))
            }    
        }
    }
}

export default new ControllerModel()