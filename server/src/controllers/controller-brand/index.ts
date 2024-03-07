import {NextFunction, Response} from 'express'
import { BrandAttributes } from '@models/brand/types'
import { ParamsGetAllBrands, ParamsGetOneBrand, ParamsDeleteBrand} from './types'
import serviceBrand from '@services/service-brand'
import ApiError from '@api-error/index'
import dtoBrand from '@dtos/dto-brand/dto-brand'
import {RequestCreation, RequestGetAll, RequestDelete, RequestGetOne} from '@common/types'


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

    async getByIdBrand(req: RequestGetOne<ParamsGetOneBrand>, res: Response, next: NextFunction) {
        try {
            const dtoBrandGetById = dtoBrand.getDtoBrandGetById(req.query)
            const brandOne = await serviceBrand.getByIdBrand(dtoBrandGetById, next)

            if(brandOne) {
                res.send(brandOne)
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async dropBrand(req: RequestDelete<ParamsDeleteBrand>, res: Response, next: NextFunction) {
        try {
            const id = await serviceBrand.dropBrand(req.query.id, next)
            res.send(id)
        } catch (error) {
            next(ApiError.internal(error))
        }
    }
}

export default new ControllerBrand()