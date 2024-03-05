import ApiError from "@api-error/index"
import { NextFunction, Response } from "express"
import {ParamsGetAllCategories, ParamsDeleteCategoryDetail} from '@routers/router-detail/router-detail-category/types'
import serviceCategory from "@services/service-detail/service-detail-category"
import dtoDetailCategory from '@dtos/dto-detail/dto-detail-category/dto-detail-category'
import { RequestCreation, RequestDelete, RequestGetAll } from "@common/types"
import { DetailCategoryAttributes } from '@models/detail/detail-category/types'


class ControllerCategory {

   async createDetailCategory(req: RequestCreation<DetailCategoryAttributes>, res:Response, next: NextFunction) {

        try {
            const dtoDetailCategoryCreation = dtoDetailCategory.getDtoDetailCategoryCreation(req.body)
            const category = await serviceCategory.createDetailCategory(dtoDetailCategoryCreation, next)

            if(category) {
                res.send(category)
            }
        } catch (error) {
            next(ApiError.bedRequest(error))
        }
    }

    async getAllDetailCategory(req: RequestGetAll<ParamsGetAllCategories>, res: Response, next: NextFunction) {
        try {
            const dtoDetailCategoryGetAll = dtoDetailCategory.getDtoGetAllDetailCategory(req.query)
            const categoriesAll = await serviceCategory.getAllDetailCategory(dtoDetailCategoryGetAll, next)

            res.send(categoriesAll)
        } catch (error) {
            next(ApiError.bedRequest(error))
        }
    }


    async dropCategoryDetail(req: RequestDelete<ParamsDeleteCategoryDetail>, res: Response, next: NextFunction) {
        try {
            const id = await serviceCategory.dropCategoryDetail(req.query.id, next)
            res.send(id)
        } catch (error) {
            next(ApiError.internal(error))
        }
    }
}

export default new ControllerCategory()