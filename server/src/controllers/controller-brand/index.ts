import {Response} from 'express'
import serviceBrand from '@services/service-brand'
import {CreateBrandRequest, GetBrandsRequest} from '@routers/router-brand/types'
import {CreateBrandDto, GetBrandsDto} from '@common/dto'

class ControllerBrand {
    async create(req: CreateBrandRequest, res: Response) {
        try {
            const createBrandDto: CreateBrandDto = {
                name: req.body.name
            }

            serviceBrand.create(createBrandDto, res)
        } catch (error) {
            
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