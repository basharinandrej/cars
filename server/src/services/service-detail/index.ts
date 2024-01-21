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
                modelId: createDetailDto.modelId
            })
        
            return createDetailMapper(detail)
       } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
       }
    }


    async getAllDetails(getDetailsDto: GetDetailsDto, res: Response) {

        const details = await Detail?.findAndCountAll({
            limit: getDetailsDto.limit,
            offset: getDetailsDto.offset,
        })
        res.send({details})
    }
}


export default new ServiceDetail()