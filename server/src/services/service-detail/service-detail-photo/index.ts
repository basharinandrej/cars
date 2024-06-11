import { NextFunction } from "express";
import DetailPhoto from "@models/detail/detail-photo"
import {DetailPhotoAttributes} from '@models/detail/detail-photo/types'
import ApiError from "@api-error/index";
import {DtoDetailPhotoCreation} from '@dtos/dto-detail/dto-detail-photo/types'
import { errorStrings } from "@common/error-strings";
import {mapperCreateDetailPhoto} from './detail-photo-mappers/mapper-create-detail-photo'

class ServiceDetailPhoto {
    //@ts-ignore
    async createOneDetailPhoto(dtoDetailPhotosCreate: DtoDetailPhotoCreation, next: NextFunction): Promise<DetailPhotoAttributes> {
        try {
            const detailPhoto = await DetailPhoto.create({
                url: dtoDetailPhotosCreate.url,
                detailId: dtoDetailPhotosCreate.detailId
            })

            return mapperCreateDetailPhoto(detailPhoto)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceDetailPhoto.createOneDetailPhoto'))
            }
        }
    }
    
    //@ts-ignore
    async createDetailPhotos(dtoDetailPhotosCreate: DtoDetailPhotoCreation[], next: NextFunction): Promise<Array<DetailPhotoAttributes>> {
        try {
            const detailPhotos = new Promise<Array<DetailPhotoAttributes>>(resolve => {
                const detailPhotos: any[] = []

                dtoDetailPhotosCreate.forEach( async(photo, idx) => {

                    const detailPhoto = await DetailPhoto.create({
                        url: photo.url,
                        detailId: photo.detailId
                    })

                    if(!detailPhoto.dataValues) {
                        next(ApiError.bedRequest(errorStrings.failedToAddPhoto()))
                    }

                    detailPhotos.push(mapperCreateDetailPhoto(detailPhoto))

                    if(idx === dtoDetailPhotosCreate.length-1) {
                        resolve(detailPhotos)
                    }
                })
            })

            return detailPhotos

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceDetailPhoto.createDetailPhotos'))
            }
        }
    }
}

export default new ServiceDetailPhoto()