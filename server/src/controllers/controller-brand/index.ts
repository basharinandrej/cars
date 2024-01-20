import {NextFunction, Response} from 'express'
import serviceBrand from '@services/service-brand'
import {CreateBrandRequest, GetBrandsRequest, GetOneBrandRequest} from '@routers/router-brand/types'
import ApiError from '@api-error/index'
import dtoBrand from '@dtos/dto-brand'

class ControllerBrand {
    async createBrand(req: CreateBrandRequest, res: Response, next: NextFunction) {
        try {
            const createBrandDto = dtoBrand.createBrandDto(req.body)
            const brand = await serviceBrand.createBrand(createBrandDto, next)

            res.send(brand)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAllBrands(req: GetBrandsRequest,res: Response, next: NextFunction) {
        try {
            const getBrandsDto = dtoBrand.getBrandDto(req.query)
            const brands = await serviceBrand.getAllBrands(getBrandsDto, next)

            res.send(brands)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getOne(req: GetOneBrandRequest, res: Response, next: NextFunction) {
        try {
            const getOneBrandDto = dtoBrand.getOneBrandDto(req.query)
            const brandOne = await serviceBrand.getOne(getOneBrandDto.id, next)

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