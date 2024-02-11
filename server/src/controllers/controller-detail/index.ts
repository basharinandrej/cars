import {NextFunction, Response} from 'express'
import serviceDetail from '@services/service-detail'
import serviceDetailPhoto from '@services/service-detail/service-detail-photo'
import {ParamsGetAllDetails, ParamsGetOneDetail} from './types'
import {RequestCreation, RequestGetAll, RequestGetOne} from '@common/types'
import ApiError from '@api-error/index'
import dtoDetail from '@dtos/dto-detail/dto-detail'
import dtoDetailPhoto from '@dtos/dto-detail/dto-detail-photo/dto-detail-photo'
import {DetailAttributes} from '@models/detail/types'
import {moveDetailPhotosToStatic, moveDetailOnePhotoToStatic} from './utils'


class ControllerDetail {
    async createDetail(req: RequestCreation<DetailAttributes>, res: Response, next: NextFunction) {
        try {
            const photos = req.files.photos

            const authorization = req.get('Authorization')
            const dtoDetailCreation = dtoDetail.getDtoDetailCreation(req.body, authorization)
            const detail = await serviceDetail.createDetail(dtoDetailCreation, next)

            if(Array.isArray(photos)) {
                const fileNames = moveDetailPhotosToStatic(photos)
                const detailPhotosCreation = dtoDetailPhoto.getDtoDetailAllPhotosCreation(fileNames, detail.id);
                const detailPhotos = await serviceDetailPhoto.createDetailPhotos(detailPhotosCreation, next)

                if(detail && detailPhotos.length) {
                    res.send({detail, detailPhotos})
                }
            } else {
                const fileName = moveDetailOnePhotoToStatic(photos)
                const oneDetailPhotoCreation = dtoDetailPhoto.getDtoDetailOnePhotoCreation(fileName, detail.id);
                const detailPhotos = await serviceDetailPhoto.createOneDetailPhoto(oneDetailPhotoCreation, next)
                
                if(detail && detailPhotos.id) {
                    res.send({detail, detailPhotos})
                }
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