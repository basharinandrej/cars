import {DtoServiceCategoryCreation, DtoServiceCategoryGetAll} from '@dtos/dto-service-category/types'
import { NextFunction } from 'express'
import ApiError from '@api-error/index'
import ServiceCategory from '@models/service-category'
import {mapperServiceCategoryCreation} from './service-category-mapper/mapper-service-category-creation'



class ServiceServiceCategory {
    async createServiceCategory(dtoServiceCategoryCreate: DtoServiceCategoryCreation, next: NextFunction) {
        try {
            const serviceCategory = await ServiceCategory.create({
                name: dtoServiceCategoryCreate.name,
                description: dtoServiceCategoryCreate.description
            })

            return mapperServiceCategoryCreation(serviceCategory)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAllServiceCategories({limit, offset}: DtoServiceCategoryGetAll, next: NextFunction) {
        try {
            const categories = await ServiceCategory.findAndCountAll({
                limit, offset
            })

            // mapper
            return categories
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

}


export default new ServiceServiceCategory()