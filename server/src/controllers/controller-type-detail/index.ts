import {NextFunction, Response} from 'express'
import serviceTypeDetail from '@services/service-type-detail'
import {CreateTypeDetailRequest, GetTypeDetailsRequest} from '@routers/router-type-detail/types'
import  {GetTypeDetailsDto} from '@common/dtos'
import dtoTypeDetail from '@dtos/dto-type-detail'

class ControllerTypeDetail {
    async createTypeDetail(req: CreateTypeDetailRequest, res: Response, next: NextFunction) {
        try {
            const createTypeDetailDto = dtoTypeDetail.createTypeDetailDto(req.body)
            const typeDetail = await serviceTypeDetail.createTypeDetail(createTypeDetailDto, next)

            res.send(typeDetail)
        } catch (error) {
            
        }
    }

    async getAllTypeDetails(req: GetTypeDetailsRequest, res: Response) {
        try {
            const getTypeDetailsDto: GetTypeDetailsDto = {
                limit: req.query.limit,
                offset: req.query.offset
            }

            serviceTypeDetail.getAllTypeDetails(getTypeDetailsDto, res)
        } catch (error) {
            
        }
    }
}

export default new ControllerTypeDetail()