import { NextFunction, Response } from "express";
import ApiError from "@api-error/index";
import serviceService from "@services/service-service";
import dtoService from '@dtos/dto-service/dto-service'
import { RequestCreation, RequestGetAll } from "@common/types";
import {ParamsGetAllServices} from './types'
import { OrganizationServiceCategoryAttributes } from "@models/organization-service-category/types";


class ControllerOrganizationServiceCategory {
    async createOrganizationServiceCategory(req: RequestCreation<OrganizationServiceCategoryAttributes>, res: Response, next: NextFunction) {
        try {

            const dtoOrganizationServiceCategoryCreation = dtoService.getDtoOrganizationServiceCategoryCreation(req.body, req.cookies)
            const service = await serviceService.createServiceOrganizationServiceCategory(dtoOrganizationServiceCategoryCreation, next)

            res.send(service)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.bedRequest(error))
            }
        }
    }

    async getAllOrganizationServiceCategories(req: RequestGetAll<ParamsGetAllServices>, res: Response, next: NextFunction) {
        try {
            
            const dtoOrganizationServiceCategoriesGetAll = dtoService.getDtoOrganizationServiceCategoryGetAll(req.query)
            const services = await serviceService.getAllServiceOrganizationServiceCategories(dtoOrganizationServiceCategoriesGetAll, next)

            if(services) {
                res.status(200).send(services)
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.bedRequest(error))
            }
        }
    }
}

export default new ControllerOrganizationServiceCategory()