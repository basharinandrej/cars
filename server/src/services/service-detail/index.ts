import { Op, WhereOptions } from 'sequelize'
import {NextFunction} from 'express'
import {DtoDetailCreation, DtoDetailGetAll, DtoDetailGetById} from '@dtos/dto-detail/types'
import Detail from '@models/detail'
import ApiError from '@api-error/index'
import Model from '@models/model'
import Address from '@models/address'
import User from '@models/user'
import DetailCategory from '@models/detail/detail-category'
import { errorStrings } from '@common/error-strings'
import { DetailAttributes } from '@models/detail/types'
import DetailPhoto from '@models/detail/detail-photo'


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

            return detail
       } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceDetail.createDetail'))
            }
       }
    }

    async getAllDetails({limit, offset, modelId, detailCategoryId, keyword, userId}: DtoDetailGetAll, next: NextFunction) {
        const attributes = [
            'id', 
            'name', 
            'vendorCode', 
            'wear',
            'year', 
            'description', 
            'price', 
            'createdAt', 
            'modelId', 
            'detailCategoryId',
            'userId'
        ]
        try {
            const params: WhereOptions<DetailAttributes> = {}

            if(modelId) params.modelId = modelId
            if(detailCategoryId) params.detailCategoryId = detailCategoryId
            if(userId) params.userId = userId
            
            if(keyword) {
                const details = await Detail?.findAndCountAll({
                    limit,
                    offset,
                    where: {
                        ...params, 
                        [Op.or]: [
                            {name: {[Op.substring]: keyword.toLocaleLowerCase() }},
                            {vendorCode: {[Op.substring]: keyword.toLocaleLowerCase() }}
                        ]
                    },
                    attributes,
                    include: [
                        {
                            model: DetailPhoto,
                            as: 'detailPhoto',
                            attributes: ['id', 'url']
                        }
                    ]
                })
                return details
            } else {
                const details = await Detail?.findAndCountAll({
                    limit,
                    offset,
                    where: params,
                    attributes,
                    include: [
                        {
                            model: DetailPhoto,
                            as: 'detailPhoto',
                            attributes: ['id', 'url']
                        }
                    ]
                })
                return details
            }

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceDetail.getAllDetails'))
            }
        }
    }

    async getByIdDetail(dtoDetailGetById: DtoDetailGetById, next: NextFunction) {
        try {

            const detail = await Detail.findOne({
                where: {id: dtoDetailGetById.id},
                include: [
                    {
                        model: DetailPhoto,
                        as: 'detailPhoto',
                        attributes: ['id', 'url']
                    },
                    {
                        model: Model,
                        as: 'model',
                        attributes: ['id', 'name', 'brandId']
                    },
                    {
                        model: DetailCategory,
                        as: 'detailCategory',
                        attributes: ['id', 'name']
                    },
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name', 'surname', 'email', 'role', 'phoneNumber', 'ban']
                    }
                ]
            })

            return detail
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceDetail.getByIdDetail'))
            }
        }
    }


    async dropDetail(id: number, next: NextFunction) {
        try {
            const result = await Detail.destroy({
                where: {id},
            })
            return result ? id : false
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceDetail.dropDetail'))
            }
        }
    }
}


export default new ServiceDetail()
