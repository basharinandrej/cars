import {NextFunction, Response} from 'express'
import {CreateDetailDto, GetDetailsDto} from '@common/dtos'
import Detail from '@models/detail'
import TypeDetail from '@models/type-detail'
import ApiError from '@api-error/index'


class ServiceDetail {
    async createDetail(createDetailDto: CreateDetailDto, res: Response, next: NextFunction) {

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
                typeDetailId: createDetailDto.typeDetailId
            })
        
            res.send({detail})
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
            include: TypeDetail
        })
        res.send({details})
    }
}


export default new ServiceDetail()