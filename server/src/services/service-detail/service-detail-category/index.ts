import { NextFunction } from "express";
import Category from "@models/detail/detail-category"
import { DtoCategoryDetailUpdation, DtoDetailCategoryCreation, DtoDetailCategoryGetAll} from '@dtos/dto-detail/dto-detail-category/types'
import ApiError from "@api-error/index";
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
    
            return detailCategory
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceDetailCategory.createDetailCategory'))
            }
        }
    }

    async getAllDetailCategory({limit, offset}: DtoDetailCategoryGetAll, next: NextFunction) {
        try {
            
            const detailCategories = await Category.findAndCountAll({
                limit, offset, attributes: ['id', 'name']
            })
            return detailCategories
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceDetailCategory.getAllDetailCategory'))
            }
        }
    }

    async updateCategoryDetail(dtoCategoryDetailUpdation: DtoCategoryDetailUpdation, next: NextFunction) {

        try {
            const result = await Category.update({
                name: dtoCategoryDetailUpdation.name
            }, {where: {id: dtoCategoryDetailUpdation.id}})

            return result[0] ? 'updated' : false
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceDetailCategory.updateCategoryDetail'))
            }
        }
    }

    async dropCategoryDetail(id: number, next: NextFunction) {
        try {
            const result = await Category.destroy({
                where: {id},
            })
            return result ? id : false
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceDetailCategory.dropCategoryDetail'))
            }
        }
    }
}

export default new ServiceDetailCategory()