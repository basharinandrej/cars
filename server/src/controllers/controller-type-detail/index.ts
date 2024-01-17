import {Response} from 'express'
import serviceTypeDetail from '@services/service-type-detail'
import {CreateTypeDetailRequest, GetTypeDetailsRequest} from '@routers/router-type-detail/types'
import {CreateTypeDetailDto, GetTypeDetailsDto} from '@common/dtos'

class ControllerTypeDetail {
    async createTypeDetail(req: CreateTypeDetailRequest, res: Response) {
        try {
            const createTypeDetailDto: CreateTypeDetailDto = {
                name: req.body.name,
                partsOfCarId: req.body.partsOfCarId
            }

            serviceTypeDetail.createTypeDetail(createTypeDetailDto, res)
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