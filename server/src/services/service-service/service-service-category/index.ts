import {DtoServiceCategoryCreation, DtoCategoryServiceUpdation, DtoServiceCategoryGetAll} from '@dtos/dto-service/dto-service-category/types'
import { NextFunction } from 'express'
import ApiError from '@api-error/index'
import ServiceCategory from '@models/service-category'
import {mapperServiceCategoryCreation} from './service-category-mapper/mapper-service-category-creation'
import {mapperServiceCategoryGetAll} from './service-category-mapper/mapper-service-category-get-all'


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
                next(ApiError.internal(error.message, 'ServiceServiceCategory.createServiceCategory'))
            }
        }
    }

    async getAllServiceCategories({limit, offset}: DtoServiceCategoryGetAll, next: NextFunction) {
        try {
            const categories = await ServiceCategory.findAndCountAll({
                limit, offset
            })

            return mapperServiceCategoryGetAll(categories)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceServiceCategory.getAllServiceCategories'))
            }
        }
    }

    async dropCategoryService(id: number, next: NextFunction) {
        try {
            const result = await ServiceCategory.destroy({
                where: {id},
            })
            return result ? id : false
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceServiceCategory.dropCategoryService'))
            }
        }
    }

    async updateCategoryService(dtoCategoryServiceUpdation: DtoCategoryServiceUpdation, next: NextFunction) {

        try {
            const result = await ServiceCategory.update({
                name: dtoCategoryServiceUpdation.name
            }, {where: {id: dtoCategoryServiceUpdation.id}})

            return result ? 'updated' : false
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceServiceCategory.updateCategoryService'))
            }
        }
    }
}


export default new ServiceServiceCategory()