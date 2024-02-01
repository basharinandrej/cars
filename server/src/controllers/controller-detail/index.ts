import {NextFunction, Response} from 'express'
import serviceDetail from '@services/service-detail'
import {ParamsGetAllDetails, ParamsSearchDetails, ParamsGetOneDetail} from './types'
import {RequestCreation, RequestGetAll, RequestGetOne} from '@common/types'
import ApiError from '@api-error/index'
import dtoDetail from '@dtos/dto-detail/dto-detail'
import {DetailAttributes} from '@models/detail/types'
import uuid from 'uuid'
import path from 'path'


class ControllerDetail {
    async createDetail(req: RequestCreation<DetailAttributes>, res: Response, next: NextFunction) {
        try {
            const {img} = req.files
            const fileName = 'uuid.v4()' + '.jpg'
            console.log('>>> fileName', fileName)
            console.log('>>> img', img)
            console.log('>>>> ', path.resolve(__dirname, '../../..', 'src/static', fileName))
            if(!Array.isArray(img)) {
                img.mv(path.resolve(__dirname, '../..', 'static', fileName))
            }

            const authorization = req.get('Authorization')
            const dtoDetailCreation = dtoDetail.getDtoDetailCreation(req.body, fileName, authorization)
            const detail = await serviceDetail.createDetail(dtoDetailCreation, next)

            if(detail) {
                res.send(detail)
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAllDetails(req: RequestGetAll<ParamsGetAllDetails>, res: Response, next: NextFunction) {
        try {
            const dtoDetailGetById = dtoDetail.getDtoDetailsGetAll(req.query)
            const details = await serviceDetail.getAllDetails(dtoDetailGetById, next)

            res.send(details)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async search(req: RequestGetAll<ParamsSearchDetails>, res: Response, next: NextFunction) {
        try {
            const dtoDetailSearch = dtoDetail.getDtoDetailSearch(req.query)
            const details = await serviceDetail.search(dtoDetailSearch, next)
            
            res.send(details)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getByIdDetail(req: RequestGetOne<ParamsGetOneDetail>, res: Response, next: NextFunction) {
        try {
            const dtoDetailGetById = dtoDetail.getDtoDetailGetById(req.query)
            const detail = await serviceDetail.getByIdDetail(dtoDetailGetById, next)

            res.send(detail)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export default new ControllerDetail()