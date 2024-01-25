import {NextFunction, Response} from 'express'
import { BrandAttributes } from '@models/brand/types'
import { ParamsGetAllBrands, ParamsGetOneBrand} from '@routers/router-brand/types'
import serviceBrand from '@services/service-brand'
import ApiError from '@api-error/index'
import dtoBrand from '@dtos/dto-brand/dto-brand'
import {RequestCreation, RequestGetAll, RequestGetOne} from '@common/types'


class ControllerBrand {
    async createBrand(req: RequestCreation<BrandAttributes>, res: Response, next: NextFunction) {
        try {
            const dtoBrandCreation = dtoBrand.getDtoBrandCreation(req.body)
            const brand = await serviceBrand.createBrand(dtoBrandCreation, next)

            res.send(brand)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAllBrands(req: RequestGetAll<ParamsGetAllBrands>, res: Response, next: NextFunction) {
        try {
            const dtoBrandsGetAll = dtoBrand.getDtoBrandsGetAll(req.query)
            const brands = await serviceBrand.getAllBrands(dtoBrandsGetAll, next)

            res.send(brands)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getById(req: RequestGetOne<ParamsGetOneBrand>, res: Response, next: NextFunction) {
        try {
            const dtoBrandGetById = dtoBrand.getDtoBrandGetById(req.query)
            const brandOne = await serviceBrand.getById(dtoBrandGetById, next)

            if(brandOne) {
                res.send(brandOne)
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export default new ControllerBrand()