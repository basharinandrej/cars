import {NextFunction, Response} from 'express'
import {CreateServiceCategoryRequest, GetServiceCategoriesRequest} from '@routers/router-service-category/types'
import ApiError from '@api-error/index'
import dtoServiceCategory from '@dtos/dto-service-category/dto-service-category'
import serviceServiceCategory from '@services/service-service-category'

class ControllerServiceCategory {
    async createServiceCategory(req: CreateServiceCategoryRequest, res: Response, next: NextFunction) {
        try {
            const dtoServiceCategoryCreate = dtoServiceCategory.getDtoServiceCategoryCreation(req.body)
            const ServiceCategory = await serviceServiceCategory.createServiceCategory(dtoServiceCategoryCreate, next)
            
            res.send(ServiceCategory)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAllServiceCategories(req: GetServiceCategoriesRequest, res: Response, next: NextFunction) {
        try {
            const allServiceCategoriesDto = dtoServiceCategory.getDtoServiceCategoryGetAll(req.query)
            const serviceCategories = await serviceServiceCategory.getAllServiceCategories(allServiceCategoriesDto, next)

            res.send(serviceCategories)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export default new ControllerServiceCategory()