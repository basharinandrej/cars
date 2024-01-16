import {Response} from 'express'
import serviceModel from '@services/service-model'
import {CreateModelRequest, GetModelsRequest} from '@routers/router-model/types'
import {CreateModelDto, GetModelsDto} from '@common/dto'


class ControllerModel {
    async createModel(req: CreateModelRequest, res: Response) {
        try {
            const createModelDto: CreateModelDto = {
                name: req.body.name,
                brandId: req.body.brandId,
                typeCarId: req.body.typeCarId
            }

            serviceModel.createModel(createModelDto, res)
        } catch (error) {
            
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