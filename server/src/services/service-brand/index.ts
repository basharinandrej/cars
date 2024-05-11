import { Op } from 'sequelize'
import {NextFunction} from 'express'
import {DtoBrandCreation, DtoBrandsGetAll, DtoBrandGetById, DtoBrandUpdation} from '@dtos/dto-brand/types'
import Brand from '@models/brand'
import Model from '@models/model'
import ApiError from '@api-error/index'
import { errorStrings } from '@common/error-strings'


class ServiceBrand {
    async createBrand(dtoBrandCreation: DtoBrandCreation, next: NextFunction) {

        try {
            const brand = await Brand.create({
                name: dtoBrandCreation.name.toLocaleLowerCase()
            })

            return brand
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceBrand.createBrand'))
            }
        }
    }


    async getAllBrands({orderBy, sortBy, limit, offset, keyword}: DtoBrandsGetAll, next: NextFunction) {

        try {
            if(orderBy && sortBy && !keyword) {
                const brands = await Brand?.findAndCountAll({
                    limit,
                    offset,
                    order: [
                        [sortBy, orderBy],
                    ],
                    attributes: ['id', 'name']
                })
                return brands

            }  else if(orderBy && sortBy && keyword){
                const brands = await Brand.findAndCountAll({
                    offset, 
                    limit,
                    order: [
                        [sortBy, orderBy],
                    ],
                    where: {
                        [Op.or]: [
                            {name: {[Op.substring]: keyword.toLocaleLowerCase() }},
                        ]
                    },
                    attributes: ['id', 'name']
                })
                return brands

            } else {
                const brands = await Brand?.findAndCountAll({
                    limit,
                    offset,
                    attributes: ['id', 'name']
                })
        
                return brands
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceBrand.getAllBrands'))
            }
        }
    }

    async getByIdBrand(dtoBrandGetById: DtoBrandGetById, next: NextFunction) {
        try {
            const brand = await Brand.findOne({
                where: {id: dtoBrandGetById.id},
                include: {
                    model: Model,
                    as: 'model',
                    attributes: ['id']
                },
                attributes: ['id', 'name']
            })

            if(!brand) {
                return next(ApiError.bedRequest(errorStrings.notFoundBrand(dtoBrandGetById.id)))
            }

            return brand
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceBrand.getByIdBrand'))
            }
        }
    }

    async dropBrand(id: number, next: NextFunction) {
        try {
            const result = await Brand.destroy({
                where: {id},
            })
            return result ? id : false
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error, 'ServiceBrand.dropBrand'))
            }
        }
    }

    async updateBrand(dtoBrandUpdation: DtoBrandUpdation, next: NextFunction) {

        try {
            const result = await Brand.update({
                name: dtoBrandUpdation.name.toLocaleLowerCase(),
            }, {where: {id: dtoBrandUpdation.id}})

            return result ? 'updated' : false
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error, 'ServiceBrand.updateBrand'))
            }        
        }
    }
}


export default new ServiceBrand()