import { Op } from 'sequelize'
import {NextFunction} from 'express'
import {DtoDetailCreation, DtoDetailGetAll, DtoDetailGetById, DtoDetailSearch} from '@dtos/dto-detail/types'
import Detail from '@models/detail'
import ApiError from '@api-error/index'
import {mapperDetailCreation} from './detail-mapper/mapper-detail-creation'
import {mapperGetAllDetails} from './detail-mapper/mapper-get-all-details'
import {mapperDetailGetById} from './detail-mapper/mapper-detail-get-by-id'
import Model from '@models/model'
import Address from '@models/address'
import User from '@models/user'
import DetailCategory from '@models/detail/detail-category'


class ServiceDetail {
    async createDetail(dtoDetailCreation: DtoDetailCreation, next: NextFunction) {

       try {
            const detail = await Detail.create({
                name: dtoDetailCreation.name.toLocaleLowerCase(),
                vendorCode: dtoDetailCreation.vendorCode,
                wear: dtoDetailCreation.wear,
                year: dtoDetailCreation.year,
                description: dtoDetailCreation.description,
                price: dtoDetailCreation.price,
                modelId: dtoDetailCreation.modelId,
                detailCategoryId: dtoDetailCreation.detailCategoryId,
            })
        
            return mapperDetailCreation(detail)
       } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
       }
    }


    async getAllDetails({limit, offset, modelId, detailCategoryId}: DtoDetailGetAll, next: NextFunction) {

        try {
            if(detailCategoryId && modelId) {
                const details = await Detail?.findAndCountAll({
                    limit,
                    offset,
                    where: { modelId, detailCategoryId }
                })
                return mapperGetAllDetails(details)
            }
            if(modelId) {
                const details = await Detail?.findAndCountAll({
                    limit,
                    offset,
                    where: { modelId }
                })
                return mapperGetAllDetails(details)
            }
    
            if(detailCategoryId) {
                const details = await Detail?.findAndCountAll({
                    limit,
                    offset,
                    where: { detailCategoryId }
                })
                return mapperGetAllDetails(details)
            }
    
            const details = await Detail?.findAndCountAll({
                limit,
                offset,
            })
            return mapperGetAllDetails(details)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }


    async search(dtoDetailSearch: DtoDetailSearch, next: NextFunction) {
        try {
            const {keyword, limit, offset} = dtoDetailSearch

            const details = await Detail.findAndCountAll({
                offset, limit,
                where: {
                    [Op.or]: [
                        {name: {[Op.substring]: keyword.toLocaleLowerCase() }},
                        {vendorCode: {[Op.substring]: keyword.toLocaleLowerCase() }}
                    ]
                }
            })
            return mapperGetAllDetails(details)
            
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }


    async getByIdDetail(dtoDetailGetById: DtoDetailGetById, next: NextFunction) {
        try {
            
            const detail = await Detail.findOne({
                where: {id: dtoDetailGetById.id},
                include: [Model, Address, User, DetailCategory]
            })

            return mapperDetailGetById(detail)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}


export default new ServiceDetail()