import { Op } from 'sequelize'
import {NextFunction} from 'express'
import {DtoDetailCreation, DtoDetailGetAll, DtoDetailGetById} from '@dtos/dto-detail/types'
import Detail from '@models/detail'
import ApiError from '@api-error/index'
import {mapperDetailCreation} from './detail-mapper/mapper-detail-creation'
import {mapperGetAllDetails} from './detail-mapper/mapper-get-all-details'
import {mapperDetailGetById} from './detail-mapper/mapper-detail-get-by-id'
import Model from '@models/model'
import Address from '@models/address'
import User from '@models/user'
import DetailCategory from '@models/detail/detail-category'
import { errorStrings } from '@common/error-strings'
import { DetailAttributes } from '@models/detail/types'


class ServiceDetail {
    async createDetail(dtoDetailCreation: DtoDetailCreation, next: NextFunction) {

       try {
            const candidates = {
                'modelId': await Model.findOne({where: {id: dtoDetailCreation.modelId}}),
                'detailCategoryId':  await DetailCategory.findOne({where: {id: dtoDetailCreation.detailCategoryId}}),
                'userId':await User.findOne({where: {id: dtoDetailCreation.userId}})
            }

            Object.entries(candidates).forEach(([key, value]) => {
                if(!value) return next(ApiError.bedRequest(errorStrings.notFound(key)))
            })


            const detail = await Detail.create({
                name: dtoDetailCreation.name.toLocaleLowerCase(),
                vendorCode: dtoDetailCreation.vendorCode,
                wear: dtoDetailCreation.wear,
                year: dtoDetailCreation.year,
                description: dtoDetailCreation.description,
                price: dtoDetailCreation.price,

                modelId: dtoDetailCreation.modelId,
                detailCategoryId: dtoDetailCreation.detailCategoryId,
                userId: dtoDetailCreation.userId
            })

            return mapperDetailCreation(detail)
       } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
       }
    }


    async getAllDetails({limit, offset, modelId, detailCategoryId, keyword}: DtoDetailGetAll, next: NextFunction) {

        try {
            const params: Partial<DetailAttributes> = {}

            if(modelId) params.modelId = modelId
            if(detailCategoryId) params.detailCategoryId = detailCategoryId
            if(keyword) params[Op.or] = [
                {name: {[Op.substring]: keyword.toLocaleLowerCase() }},
                {vendorCode: {[Op.substring]: keyword.toLocaleLowerCase() }}
            ]

            const details = await Detail?.findAndCountAll({
                limit,
                offset,
                where: params
            })
            return mapperGetAllDetails(details)
            
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
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
