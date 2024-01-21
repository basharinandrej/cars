import {NextFunction, Response} from 'express'
import {CreateDetailDto, GetDetailsDto} from '@dtos/dto-detail/types'
import Detail from '@models/detail'
import ApiError from '@api-error/index'
import {createDetailMapper} from './detail-mapper/create-detail-mappper'

class ServiceDetail {
    async createDetail(createDetailDto: CreateDetailDto, next: NextFunction) {

       try {
            const detail = await Detail.create({
                name: createDetailDto.name,
                vendorCode: createDetailDto.vendorCode,
                wear: createDetailDto.wear,
                year: createDetailDto.year,
                description: createDetailDto.description,
                price: createDetailDto.price,
                photos: createDetailDto.photos,
                state: createDetailDto.state,
                modelId: createDetailDto.modelId,
                categoryId: createDetailDto.categoryId
            })
        
            return createDetailMapper(detail)
       } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
       }
    }


    async getAllDetails({limit, offset, modelId, categoryId}: GetDetailsDto, res: Response) {

        if(categoryId && modelId) {
            const details = await Detail?.findAndCountAll({
                limit,
                offset,
                where: { modelId, categoryId }
            })
            return res.send({details})
        }
        if(modelId) {
            const details = await Detail?.findAndCountAll({
                limit,
                offset,
                where: { modelId }
            })
            return res.send({details})
        }

        if(categoryId) {
            const details = await Detail?.findAndCountAll({
                limit,
                offset,
                where: { categoryId }
            })
            return res.send({details})
        }

        const details = await Detail?.findAndCountAll({
            limit,
            offset,
        })
        return res.send({details})
    }
}


export default new ServiceDetail()