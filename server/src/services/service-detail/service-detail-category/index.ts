import { NextFunction } from "express";
import Category from "@models/detail/detail-category"
import { DtoCategoryDetailUpdation, DtoDetailCategoryCreation, DtoDetailCategoryGetAll} from '@dtos/dto-detail/dto-detail-category/types'
import ApiError from "@api-error/index";
import {mapperCreateCategory} from './service-mappers/mapper-create-category'
import {mapperGetAllCategories} from './service-mappers/mapper-get-all-categories'
import { errorStrings } from "@common/error-strings";


class ServiceDetailCategory {
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

    async updateCategoryDetail(dtoCategoryDetailUpdation: DtoCategoryDetailUpdation, next: NextFunction) {

        try {
            const result = await Category.update({
                name: dtoCategoryDetailUpdation.name
            }, {where: {id: dtoCategoryDetailUpdation.id}})

            return result ? 'updated' : false
        } catch (error) {
            next(ApiError.internal(error))
        }
    }

    async dropCategoryDetail(id: number, next: NextFunction) {
        try {
            const result = await Category.destroy({
                where: {id},
            })
            return result ? id : false
        } catch (error) {
            next(ApiError.internal(error))

        }
    }
}

export default new ServiceDetailCategory()