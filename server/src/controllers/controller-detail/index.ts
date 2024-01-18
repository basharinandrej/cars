import {NextFunction, Response} from 'express'
import serviceDetail from '@services/service-detail'
import {CreateDetailRequest, GetDetailsRequest} from '@routers/router-detail/types'
import {CreateDetailDto, GetDetailsDto} from '@common/dtos'
import ApiError from '@api-error/index'

class ControllerDetail {
    async createDetail(req: CreateDetailRequest, res: Response, next: NextFunction) {
        try {
            const createDetailDto: CreateDetailDto = {
                name: req.body.name,
                vendorCode: req.body.vendorCode,
                wear: req.body.wear,
                year: req.body.year,
                description: req.body.name,
                price: req.body.price,
                photos: req.body.photos,
                state: req.body.state,
                typeDetailId: req.body.typeDetailId
            }

            serviceDetail.createDetail(createDetailDto, res, next)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAllDetails(req: GetDetailsRequest, res: Response) {
        try {
            const getDetailsDto: GetDetailsDto = {
                limit: req.query.limit,
                offset: req.query.offset
            }

            serviceDetail.getAllDetails(getDetailsDto, res)
        } catch (error) {
            
        }
    }
}

export default new ControllerDetail()