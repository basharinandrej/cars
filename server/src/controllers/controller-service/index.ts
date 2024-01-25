import { NextFunction, Response } from "express";
import ApiError from "@api-error/index";
import {CreateServiceRequest, GetServicesRequest} from '@routers/router-service/types'
import serviceService from "@services/service-service";
import dtoService from '@dtos/dto-service/dto-service'

class ControllerService {
    async createService(req: CreateServiceRequest, res: Response, next: NextFunction) {
        try {
            const dtoServiceCreation = dtoService.getDtoServiceCreation(req.body)
            const service = await serviceService.createService(dtoServiceCreation, next)

            res.send(service)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.bedRequest(error))
            }
        }
    }

    async getAllServices(req: GetServicesRequest, res: Response, next: NextFunction) {
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