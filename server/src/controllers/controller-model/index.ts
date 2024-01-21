import {NextFunction, Response} from 'express'
import serviceModel from '@services/service-model'
import {CreateModelRequest, GetModelsRequest, GetOneModelRequest} from '@routers/router-model/types'
import ApiError from '@api-error/index'
import dtoModel from '@dtos/dto-model/dto-model'

class ControllerModel {
    async createModel(req: CreateModelRequest, res: Response, next: NextFunction) {
        try {
            const modelDtoCreate = dtoModel.createModelDto(req.body)
            const model = await serviceModel.createModel(modelDtoCreate, next)
            
            res.send(model)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAllModels(req: GetModelsRequest, res: Response, next: NextFunction) {
        try {
            const allModelsDto = dtoModel.getAllModelsDto(req.query)
            const models = await serviceModel.getAllModels(allModelsDto, next)

            res.send(models)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getOneModel(req: GetOneModelRequest, res: Response, next:NextFunction) {
        try {
            const oneModelDto = dtoModel.getOneModelDto(req.query)
            const models = await serviceModel.getOneModel(oneModelDto.id, next)

            res.send(models)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export default new ControllerModel()