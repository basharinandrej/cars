import serviceRequest from '@services/service-request'
import { NextFunction, Response } from 'express'
import {ParamsRequestGetAll, ParamsRequestGetById} from '@controllers/controller-request/types'
import ApiError from '@api-error/index'
import dtoRequest from '@dtos/dto-request/dto-request'
import { emitter } from '@controllers/controller-notification'
import { RequestCreation, RequestGetAll, RequestGetOne } from '@common/types'
import { RequestAttributes } from '@models/request/types'


class ControllerRequest {
    async createRequest(req: RequestCreation<RequestAttributes>, res: Response, next: NextFunction) {
        try {
            const dtoRequestCreation = dtoRequest.getDtoRequestCreation(req.body)
            const request = await serviceRequest.createRequest(dtoRequestCreation, next)

            emitter.emit('new-request', request, dtoRequestCreation.recipienId)
            res.send(request)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAllRequest(req: RequestGetAll<ParamsRequestGetAll>, res: Response, next: NextFunction) {
        try {
            const dtoRequestGetAll = dtoRequest.getDtoRequestGetAll(req.query)
            const requests = await serviceRequest.getAllRequests(dtoRequestGetAll, next)

            res.send(requests)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getByIdRequest(req: RequestGetOne<ParamsRequestGetById>, res: Response, next: NextFunction) {
        try {
            const dtoRequestGetOne = dtoRequest.getDtoRequestGetOne(req.query)
            const request = await serviceRequest.getByIdRequest(dtoRequestGetOne, next)

            res.send(request)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async updateRequest(req: RequestCreation<RequestAttributes>, res: Response, next: NextFunction) {
        try {
            const dtoRequestUpdation = dtoRequest.getDtoRequestUpdation(req.body)
            const request = await serviceRequest.updateRequest(dtoRequestUpdation, next)

            res.status(200).send(request)
        } catch (error) {
            next(ApiError.internal(error))
        }
    }
}

export default new ControllerRequest()