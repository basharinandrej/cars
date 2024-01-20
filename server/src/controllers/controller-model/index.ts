import {NextFunction, Response} from 'express'
import serviceModel from '@services/service-model'
import {CreateModelRequest, GetModelsRequest} from '@routers/router-model/types'
import {GetModelsDto} from '@common/dtos'
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

    async getAllModels(req: GetModelsRequest, res: Response) {
        try {
            const getModelsDto: GetModelsDto = {
                limit: req.query.limit,
                offset: req.query.offset
            }

            serviceModel.getAllModels(getModelsDto, res)
        } catch (error) {
            
        }
    }
}

export default new ControllerModel()