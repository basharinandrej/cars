import {NextFunction} from 'express'
import {CreateBrandDto, GetBrandsDto} from '@dtos/dto-brand/types'
import Brand from '@models/brand'
import Model from '@models/model'
import ApiError from '@api-error/index'
import {mapperBrandCreation} from './brand-mapper/mapper-brand-creation'
import {mapperBrandGetAll} from './brand-mapper/mapper-brand-get-all'
import {mappperBrandGetById} from './brand-mapper/mapper-brand-get-by-id'
import { errorStrings } from '@common/error-strings'

class ServiceBrand {
    async createBrand(createBrandDto: CreateBrandDto, next: NextFunction) {

        try {
            const brand = await Brand.create({
                name: createBrandDto.name
            })

            return mapperBrandCreation(brand)
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
                return mapperBrandGetAll(brands)

            } else {
                const brands = await Brand?.findAndCountAll({
                    limit,
                    offset
                })
        
                return mapperBrandGetAll(brands)
            }

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getById(id: number, next: NextFunction) {
        try {
            const brand = await Brand.findOne({
                where: {id},
                include: Model
            })

            if(!brand) {
                return next(ApiError.bedRequest(errorStrings.notFoundBrand(id)))
            }

            return mappperBrandGetById(brand)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}


export default new ServiceBrand()