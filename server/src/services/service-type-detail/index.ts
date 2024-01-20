import {NextFunction, Response} from 'express'
import {CreateTypeDetailDto, GetTypeDetailsDto} from '@common/dtos'
import TypeDetail from '@models/type-detail'
import Detail from '@models/detail'
import ApiError from '@api-error/index'
import {createTypeDetailMapper} from './type-detail-mapper/create-type-detail-mapper'

class ServiceTypeDetail {
    async createTypeDetail(createTypeDetailDto: CreateTypeDetailDto, next: NextFunction) {

        try {
            const typeDetail = await TypeDetail.create({
                name: createTypeDetailDto.name,
                partsOfCarId: createTypeDetailDto.partsOfCarId
            })
            return createTypeDetailMapper(typeDetail)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }


    async getAllTypeDetails(getTypeDetailsDto: GetTypeDetailsDto, res: Response) {

        const typeDetails = await TypeDetail?.findAndCountAll({
            limit: getTypeDetailsDto.limit,
            offset: getTypeDetailsDto.offset,
            include: Detail
        })
        res.send({typeDetails})
    }
}


export default new ServiceTypeDetail()