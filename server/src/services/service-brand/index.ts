import {NextFunction} from 'express'
import {CreateBrandDto, GetBrandsDto} from '@common/dtos'
import Brand from '@models/brand'
import Model from '@models/model'
import ApiError from '@api-error/index'
import {createBrandMapper} from './brand-mapper/create-brand-mapper'
import {getAllBrandsMapper} from './brand-mapper/get-all-brands-mapper'

class ServiceBrand {
    async createBrand(createBrandDto: CreateBrandDto, next: NextFunction) {

        try {
            const brand = await Brand.create({
                name: createBrandDto.name
            })

            return createBrandMapper(brand)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }


    async getAllBrands({order, sort, limit, offset}: GetBrandsDto, next: NextFunction) {

        try {
            if(order && sort) {
                const brands = await Brand?.findAndCountAll({
                    limit,
                    offset,
                    order: [
                        [sort, order],
                    ]
                })
                return getAllBrandsMapper(brands)

            } else {
                const brands = await Brand?.findAndCountAll({
                    limit,
                    offset
                })
        
                return getAllBrandsMapper(brands)
            }

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}


export default new ServiceBrand()