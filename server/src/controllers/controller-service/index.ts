import { NextFunction, Response } from "express";
import ApiError from "@api-error/index";
import serviceService from "@services/service-service";
import dtoService from '@dtos/dto-service/dto-service'
import { RequestCreation, RequestGetAll } from "@common/types";
import {ParamsGetAllServices} from './types'
import { ServiceAttributes } from "@models/service/types";


class ControllerService {
    async createService(req: RequestCreation<ServiceAttributes>, res: Response, next: NextFunction) {
        try {
            const authorization = req.get('Authorization')
            const dtoServiceCreation = dtoService.getDtoServiceCreation(req.body, authorization)
            const service = await serviceService.createService(dtoServiceCreation, next)

            res.send(service)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.bedRequest(error))
            }
        }
    }

    async getAllServices(req: RequestGetAll<ParamsGetAllServices>, res: Response, next: NextFunction) {
        try {
            
            const dtoServicesGetAll = dtoService.getDtoServiceGetAll(req.query)
            const services = await serviceService.getAllServices(dtoServicesGetAll, next)

            if(services) {
                res.send(services)
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.bedRequest(error))
            }
        }
    }
}

export default new ControllerService()