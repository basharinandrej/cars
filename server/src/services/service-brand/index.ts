import {NextFunction} from 'express'
import {DtoBrandCreation, DtoBrandsGetAll, DtoBrandGetById} from '@dtos/dto-brand/types'
import Brand from '@models/brand'
import Model from '@models/model'
import ApiError from '@api-error/index'
import {mapperBrandCreation} from './brand-mapper/mapper-brand-creation'
import {mapperBrandGetAll} from './brand-mapper/mapper-brand-get-all'
import {mappperBrandGetById} from './brand-mapper/mapper-brand-get-by-id'
import { errorStrings } from '@common/error-strings'


class ServiceBrand {
    async createBrand(dtoBrandCreation: DtoBrandCreation, next: NextFunction) {

        try {
            const brand = await Brand.create({
                name: dtoBrandCreation.name
            })

            return mapperBrandCreation(brand)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }


    async getAllBrands({orderBy, sortBy, limit, offset}: DtoBrandsGetAll, next: NextFunction) {

        try {
            if(orderBy && sortBy) {
                const brands = await Brand?.findAndCountAll({
                    limit,
                    offset,
                    order: [
                        [sortBy, orderBy],
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

    async getByIdBrand(dtoBrandGetById: DtoBrandGetById, next: NextFunction) {
        try {
            const brand = await Brand.findOne({
                where: {id: dtoBrandGetById.id},
                include: Model
            })

            if(!brand) {
                return next(ApiError.bedRequest(errorStrings.notFoundBrand(dtoBrandGetById.id)))
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