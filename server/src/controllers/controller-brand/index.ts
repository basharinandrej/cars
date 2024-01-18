import {NextFunction, Response} from 'express'
import serviceBrand from '@services/service-brand'
import {CreateBrandRequest, GetBrandsRequest} from '@routers/router-brand/types'
import {CreateBrandDto, GetBrandsDto} from '@common/dtos'
import ApiError from '@api-error/index'

class ControllerBrand {
    async createBrand(req: CreateBrandRequest, res: Response, next: NextFunction) {
        try {
            const createBrandDto: CreateBrandDto = {
                name: req.body.name
            }

            serviceBrand.createBrand(createBrandDto, res, next)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAllBrands(req: GetBrandsRequest, res: Response) {
        try {
            const getBrandsDto: GetBrandsDto = {
                limit: req.query.limit,
                offset: req.query.offset
            }

            serviceBrand.getAllBrands(getBrandsDto, res)
        } catch (error) {
            
        }
    }
}

export default new ControllerBrand()