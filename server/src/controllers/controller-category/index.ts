import ApiError from "@api-error/index"
import { NextFunction, Response } from "express"
import {ParamsGetAllCategories} from '@routers/router-category/types'
import serviceCategory from "@services/service-category"
import dtoCategory from '@dtos/dto-category/dto-category'
import { RequestCreation, RequestGetAll } from "@common/types"
import { CategoryAttributes } from '@models/category/types'


class ControllerCategory {

   async createCategory(req: RequestCreation<CategoryAttributes>, res:Response, next: NextFunction) {

        try {
            const dtoCategoryCreation = dtoCategory.getDtoCategoryCreation(req.body)
            const category = await serviceCategory.createCategory(dtoCategoryCreation, next)

            if(category) {
                res.send(category)
            }
        } catch (error) {
            next(ApiError.bedRequest(error))
        }
    }

    async getAllCategory(req: RequestGetAll<ParamsGetAllCategories>, res: Response, next: NextFunction) {
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