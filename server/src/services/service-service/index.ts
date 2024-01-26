import { DtoServiceCreation, DtoServiceGetAll} from '@dtos/dto-service/types'
import { NextFunction } from 'express'
import ApiError from "@api-error/index";
import Service from '@models/service';
import User from '@models/user';
import ServiceCategory from '@models/service/service-category';
import {mapperServiceCreation} from './mappers-service/mapper-service-creation'
import {mapperServiceGetAll} from './mappers-service/mapper-service-get-all'



class ServiceService {
    async createService(dtoServiceCreation: DtoServiceCreation, next: NextFunction) {
        try {
            const service = await Service.create({
                name: dtoServiceCreation.name,
                description: dtoServiceCreation.description,
                price: dtoServiceCreation.price,
                userId: dtoServiceCreation.userId,
                serviceCategoryId: dtoServiceCreation.serviceCategoryId
            })

            return mapperServiceCreation(service)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.bedRequest(error))
            }
        }
    }

    async getAllServices({limit, offset, serviceCategoryId}: DtoServiceGetAll, next: NextFunction) {
        try {
            const services = await Service.findAndCountAll({
                limit, offset,
                where: {
                    serviceCategoryId
                },
                include: [User, ServiceCategory]
            })
            

            return mapperServiceGetAll(services)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.bedRequest(error))
            }
        }
    }
}


export default new ServiceService()