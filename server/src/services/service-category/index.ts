import { NextFunction } from "express";
import Category from "@modelsdetail/detail-category"
import { DtoCategoryCreation, DtoCategoryGetAll} from '@dtos/dto-category/types'
import ApiError from "@api-error/index";
import {mapperCreateCategory} from './service-mappers/mapper-create-category'
import {mapperGetAllCategories} from './service-mappers/mapper-get-all-categories'
import { errorStrings } from "@common/error-strings";


class ServiceCategory {
    async createCategory(dtoCategoryCreate: DtoCategoryCreation, next: NextFunction) {
        try {
            const candidate = await Category.findOne({where: {name: dtoCategoryCreate.name}})
            if(candidate) {
                return next(ApiError.bedRequest(errorStrings.categoryAlreadyExist(dtoCategoryCreate.name)))
            }

            const category = await Category.create({
                name: dtoCategoryCreate.name,
            })
    
            return mapperCreateCategory(category)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async getAllCategory({limit, offset}: DtoCategoryGetAll, next: NextFunction) {
        try {
            
            const categories = await Category.findAndCountAll({
                limit, offset
            })
            return mapperGetAllCategories(categories)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }
}

export default new ServiceCategory()