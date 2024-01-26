import { NextFunction } from "express";
import Category from "@models/detail/detail-category"
import { DtoDetailCategoryCreation, DtoDetailCategoryGetAll} from '@dtos/dto-detail/dto-detail-category/types'
import ApiError from "@api-error/index";
import {mapperCreateCategory} from './service-mappers/mapper-create-category'
import {mapperGetAllCategories} from './service-mappers/mapper-get-all-categories'
import { errorStrings } from "@common/error-strings";


class ServiceCategory {
    async createDetailCategory(dtoCategoryCreate: DtoDetailCategoryCreation, next: NextFunction) {
        try {
            const candidate = await Category.findOne({where: {name: dtoCategoryCreate.name}})
            if(candidate) {
                return next(ApiError.bedRequest(errorStrings.categoryAlreadyExist(dtoCategoryCreate.name)))
            }

            const detailCategory = await Category.create({
                name: dtoCategoryCreate.name,
            })
    
            return mapperCreateCategory(detailCategory)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async getAllDetailCategory({limit, offset}: DtoDetailCategoryGetAll, next: NextFunction) {
        try {
            
            const detailCategories = await Category.findAndCountAll({
                limit, offset
            })
            return mapperGetAllCategories(detailCategories)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }
}

export default new ServiceCategory()