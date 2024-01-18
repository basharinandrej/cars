import {NextFunction, Response} from 'express'
import {CreateBrandDto, GetBrandsDto} from '@common/dtos'
import Brand from '@models/brand'
import Model from '@models/model'
import ApiError from '@api-error/index'


class ServiceBrand {
    async createBrand(createBrandDto: CreateBrandDto, res: Response, next: NextFunction) {

        try {
            const brand = await Brand.create({
                name: createBrandDto.name
            })
            res.send({brand})
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }


    async getAllBrands(getBrandsDto: GetBrandsDto, res: Response) {

        const brands = await Brand?.findAndCountAll({
            limit: getBrandsDto.limit,
            offset: getBrandsDto.offset,
            include: Model
        })
        res.send({brands})
    }
}


export default new ServiceBrand()