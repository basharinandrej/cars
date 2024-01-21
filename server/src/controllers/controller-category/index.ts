import ApiError from "@api-error/index"
import { NextFunction, Response } from "express"
import {CreateCategoryRequest, GetCategoriesRequest} from '@routers/router-category/types'
import serviceCategory from "@services/service-category"
import dtoCategory from '@dtos/dto-category/dto-category'


class ControllerCategory {

   async createCategory(req: CreateCategoryRequest, res:Response, next: NextFunction) {

        try {
            const dtoCategoryCreate = dtoCategory.createCategoryDto(req.body)
            const category = await serviceCategory.createCategory(dtoCategoryCreate, next)

            if(category) {
                res.send(category)
            }
        } catch (error) {
            next(ApiError.bedRequest(error))
        }
    }

    async getAllCategory(req: GetCategoriesRequest, res: Response, next: NextFunction) {
        try {
            const dtoCategoryGetAll = dtoCategory.getDtoGetAllCategory(req.query)
            const categoriesAll = await serviceCategory.getAllCategory(dtoCategoryGetAll, next)

            res.send(categoriesAll)
        } catch (error) {
            next(ApiError.bedRequest(error))
        }
    }
}

export default new ControllerCategory()