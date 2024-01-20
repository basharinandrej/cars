import {NextFunction, Response} from 'express'
import serviceModel from '@services/service-model'
import {CreateModelRequest, GetModelsRequest} from '@routers/router-model/types'
import ApiError from '@api-error/index'
import dtoModel from '@dtos/dto-models'

class ControllerModel {
    async createModel(req: CreateModelRequest, res: Response, next: NextFunction) {
        try {
            const createModelDto = dtoModel.createModelDto(req.body)
            const model = await serviceModel.createModel(createModelDto, next)
            
            res.send(model)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAllModels(req: GetModelsRequest, res: Response, next: NextFunction) {
        try {
            const getModelsDto = dtoModel.getAllModelsDto(req.query)
            const models = await serviceModel.getAllModels(getModelsDto, next)

            res.send(models)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export default new ControllerModel()