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
                next(ApiError.internal(error.message, 'ControllerBrand.createBrand'))
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
                next(ApiError.internal(error.message, 'ControllerBrand.getAllBrands'))
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
                next(ApiError.internal(error.message, 'ControllerBrand.getByIdBrand'))
            }
        }
    }

    async dropBrand(req: RequestDelete<ParamsDeleteBrand>, res: Response, next: NextFunction) {
        try {
            const id = await serviceBrand.dropBrand(req.query.id, next)
            res.send(id)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerBrand.dropBrand'))
            }    
        }
    }

    async updateBrand(req: RequestCreation<BrandAttributes>, res: Response, next: NextFunction) {
        try {
            const dtoBrandUpdation = dtoBrand.getDtoBrandUpdation(req.body)
            const brand = await serviceBrand.updateBrand(dtoBrandUpdation, next)

            if(brand) {
                res.status(200).send(brand)
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerBrand.updateBrand'))
            }
        }
    }
}

export default new ControllerBrand()