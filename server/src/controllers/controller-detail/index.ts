import {NextFunction, Response} from 'express'
import serviceDetail from '@services/service-detail'
import {CreateDetailRequest, GetDetailsRequest, SearchDetailsRequest} from '@routers/router-detail/types'
import ApiError from '@api-error/index'
import dtoDetail from '@dtos/dto-detail/dto-detail'


class ControllerDetail {
    async createDetail(req: CreateDetailRequest, res: Response, next: NextFunction) {
        try {
            const createDetailDto = dtoDetail.getDtoDetailCreation(req.body)
            const detail = await serviceDetail.createDetail(createDetailDto, next)

            res.send(detail)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAllDetails(req: GetDetailsRequest, res: Response, next: NextFunction) {
        try {
            const getDetailsDto = dtoDetail.getDtoDetailsGetAll(req.query)
            const details = await serviceDetail.getAllDetails(getDetailsDto, next)

            res.send(details)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async search(req: SearchDetailsRequest, res: Response, next: NextFunction) {
        try {
            const dtoDetailSerach = dtoDetail.getDtoDetailSearch(req.query)
            const details = await serviceDetail.search(dtoDetailSerach, next)
            
            res.send(details)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export default new ControllerDetail()