import serviceWear from '@services/service-wear'
import { NextFunction, Response } from 'express'
import dtoWear from '@dtos/dto-wear/dto-wear'
import ApiError from "@api-error/index"
import { WearAttributes } from '@modelsdetail/detail-wear/types'
import { RequestCreation, RequestGetAll, RequestGetOne } from '@common/types'
import {ParamsGetOneWear, ParamsGetAllWears } from './types'



class ControllerWear {
    async createWear(req: RequestCreation<WearAttributes>, res: Response, next: NextFunction) {
        try {
            const dtoWearCreation = dtoWear.getDtoWearCreation(req.body)
            const wear = await serviceWear.createWear(dtoWearCreation, next)
            
            res.send(wear)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async getAllWear(req: RequestGetAll<ParamsGetAllWears>, res: Response, next: NextFunction) {
        try {
            const dtoWearCreation = dtoWear.getDtoWearGetAll(req.query)
            const wears = await serviceWear.getAllWear(dtoWearCreation, next)

            res.send(wears)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async getByIdWear(req: RequestGetOne<ParamsGetOneWear>, res: Response, next: NextFunction) {
        try {
            const dtoWearGetById = dtoWear.getDtoWearGetById(req.query)
            const wear = await serviceWear.getByIdWear(dtoWearGetById, next)

            res.send(wear)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }
}

export default new ControllerWear()