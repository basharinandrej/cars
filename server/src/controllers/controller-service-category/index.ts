import {NextFunction, Response} from 'express'
import {ParamsGetServiceCategories} from '@controllers/controller-service-category/types'
import ApiError from '@api-error/index'
import dtoServiceCategory from '@dtos/dto-service/dto-service-category/dto-service-category'
import serviceServiceCategory from '@services/service-service/service-service-category'
import { RequestCreation, RequestGetAll } from '@common/types'
import { ServiceCategoryAttributes } from "@models/service-category/types";


class ControllerServiceCategory {
    async createServiceCategory(req: RequestCreation<ServiceCategoryAttributes>, res: Response, next: NextFunction) {
        try {
            const dtoServiceCategoryCreation = dtoServiceCategory.getDtoServiceCategoryCreation(req.body)
            const ServiceCategory = await serviceServiceCategory.createServiceCategory(dtoServiceCategoryCreation, next)
            
            res.send(ServiceCategory)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAllServiceCategories(req: RequestGetAll<ParamsGetServiceCategories>, res: Response, next: NextFunction) {
        try {
            const dtoServiceCategoryGetAll = dtoServiceCategory.getDtoServiceCategoryGetAll(req.query)
            const serviceCategories = await serviceServiceCategory.getAllServiceCategories(dtoServiceCategoryGetAll, next)

            res.send(serviceCategories)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export default new ControllerServiceCategory()