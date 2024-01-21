import serviceWear from '@services/service-wear'
import { NextFunction, Response } from 'express'
import {CreateWearRequest, GetWearsRequest, GetByIdWearRequest} from '@routers/router-wear/types'
import dtoWear from '@dtos/dto-wear/dto-wear'
import ApiError from "@api-error/index"


class ControllerWear {
    async createWear(req: CreateWearRequest, res: Response, next: NextFunction) {
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

    async getAllWear(req: GetWearsRequest, res: Response, next: NextFunction) {
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

    async getByIdWear(req: GetByIdWearRequest, res: Response, next: NextFunction) {
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