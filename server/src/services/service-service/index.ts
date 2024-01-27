import { DtoServiceCreation, DtoServiceGetAll} from '@dtos/dto-service/types'
import { NextFunction } from 'express'
import ApiError from "@api-error/index";
import Service from '@models/service';
import ServiceCategory from '@models/service/service-category';
import {mapperServiceCreation} from './mappers-service/mapper-service-creation'
import {mapperServiceGetAll} from './mappers-service/mapper-service-get-all'
import Organization from '@models/organization';



class ServiceService {
    async createService(dtoServiceCreation: DtoServiceCreation, next: NextFunction) {
        try {
            const service = await Service.create({
                name: dtoServiceCreation.name,
                description: dtoServiceCreation.description,
                price: dtoServiceCreation.price,
                organizationId: dtoServiceCreation.organizationId,
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
                include: [Organization, ServiceCategory]
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