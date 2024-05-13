import ApiError from "@api-error/index"
import { NextFunction, Response } from "express"
import {ParamsGetAllCategories, ParamsDeleteCategoryDetail} from '@routers/router-detail/router-detail-category/types'
import serviceCategory from "@services/service-detail/service-detail-category"
import dtoDetailCategory from '@dtos/dto-detail/dto-detail-category/dto-detail-category'
import { RequestCreation, RequestDelete, RequestGetAll } from "@common/types"
import { DetailCategoryAttributes } from '@models/detail/detail-category/types'


class ControllerDetailCategory {

   async createDetailCategory(req: RequestCreation<DetailCategoryAttributes>, res:Response, next: NextFunction) {

        try {
            const dtoDetailCategoryCreation = dtoDetailCategory.getDtoDetailCategoryCreation(req.body)
            const category = await serviceCategory.createDetailCategory(dtoDetailCategoryCreation, next)

            if(category) {
                res.status(200).send(category)
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerDetailCategory.createDetailCategory'))
            }
        }
    }

    async getAllDetailCategory(req: RequestGetAll<ParamsGetAllCategories>, res: Response, next: NextFunction) {
        try {
            const dtoDetailCategoryGetAll = dtoDetailCategory.getDtoGetAllDetailCategory(req.query)
            const categoriesAll = await serviceCategory.getAllDetailCategory(dtoDetailCategoryGetAll, next)

            res.status(200).send(categoriesAll)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerDetailCategory.getAllDetailCategory'))
            }    
        }
    }


    async updateCategoryDetail(req: RequestCreation<DetailCategoryAttributes>, res: Response, next: NextFunction) {
        try {
            const dtoCarUpdation = dtoDetailCategory.getDtoCategoryDetailUpdation(req.body)
            const car = await serviceCategory.updateCategoryDetail(dtoCarUpdation, next)

            res.status(200).send(car)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerDetailCategory.updateCategoryDetail'))
            }   
        }
    }

    async dropCategoryDetail(req: RequestDelete<ParamsDeleteCategoryDetail>, res: Response, next: NextFunction) {
        try {
            const id = await serviceCategory.dropCategoryDetail(req.query.id, next)
            res.status(200).send(id)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerDetailCategory.dropCategoryDetail'))
            }   
        }
    }
}

export default new ControllerDetailCategory()