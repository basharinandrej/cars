import {NextFunction, Response} from 'express'
import serviceDetail from '@services/service-detail'
import serviceDetailPhoto from '@services/service-detail/service-detail-photo'
import {ParamsGetAllDetails, ParamsDeleteDelete, ParamsGetOneDetail} from './types'
import {RequestCreation, RequestGetAll, RequestDelete, RequestGetOne} from '@common/types'
import ApiError from '@api-error/index'
import dtoDetail from '@dtos/dto-detail/dto-detail'
import dtoDetailPhoto from '@dtos/dto-detail/dto-detail-photo/dto-detail-photo'
import {DetailAttributes} from '@models/detail/types'
import {moveDetailPhotosToStatic, moveDetailOnePhotoToStatic} from './utils'
import { errorStrings } from '@common/error-strings'


class ControllerDetail {
    async createDetail(req: RequestCreation<DetailAttributes>, res: Response, next: NextFunction) {
        try {
            const photos = req.files?.photos
            if(!photos) {
                return next(ApiError.bedRequest(errorStrings.mustBeAtLeastOnePhoto))
            }
            
            const dtoDetailCreation = dtoDetail.getDtoDetailCreation(req.body, req.cookies)
            const detail = await serviceDetail.createDetail(dtoDetailCreation, next)

            if(!detail) {
                return next(ApiError.internal(errorStrings.failedToCreateDetail))
            }

            if(Array.isArray(photos)) {
                const fileNames = moveDetailPhotosToStatic(photos)
                const detailPhotosCreation = dtoDetailPhoto.getDtoDetailAllPhotosCreation(fileNames, detail.dataValues.id);
                const detailPhotos = await serviceDetailPhoto.createDetailPhotos(detailPhotosCreation, next)

                if(detail && detailPhotos.length) {
                    res.status(201).send({detail, detailPhotos})
                }
            } else {
                const fileName = moveDetailOnePhotoToStatic(photos)
                const oneDetailPhotoCreation = dtoDetailPhoto.getDtoDetailOnePhotoCreation(fileName, detail.dataValues.id);
                const detailPhotos = await serviceDetailPhoto.createOneDetailPhoto(oneDetailPhotoCreation, next)
                
                if(detail && detailPhotos.id) {
                    res.send({detail, detailPhotos})
                }
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerDetail.createDetail'))
            }
        }
    }

    async getAllDetails(req: RequestGetAll<ParamsGetAllDetails>, res: Response, next: NextFunction) {
        try {
            const dtoDetailGetById = dtoDetail.getDtoDetailsGetAll(req.query)
            const details = await serviceDetail.getAllDetails(dtoDetailGetById, next)

            res.status(200).send(details)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerDetail.getAllDetails'))
            }
        }
    }

    async getByIdDetail(req: RequestGetOne<ParamsGetOneDetail>, res: Response, next: NextFunction) {
        try {
            const dtoDetailGetById = dtoDetail.getDtoDetailGetById(req.query)
            const detail = await serviceDetail.getByIdDetail(dtoDetailGetById, next)

            res.status(200).send(detail)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerDetail.getByIdDetail'))
            }
        }
    }

    async dropDetail(req: RequestDelete<ParamsDeleteDelete>, res: Response, next: NextFunction) {
        try {
            const id = await serviceDetail.dropDetail(req.query.id, next)
            res.status(200).send(id)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerDetail.dropDetail'))
            }
        }
    }
}

export default new ControllerDetail()