import { DtoOrganizationServiceCategoryCreation, DtoOrganizationServiceCategoryGetAll} from '@dtos/dto-service/types'
import { NextFunction } from 'express'
import ApiError from "@api-error/index";
import OrganizationServiceCategory from '@models/organization-service-category';
import ServiceCategory from '@models/service-category';
import Organization from '@models/organization';
import {mapperServiceCreation} from './mappers-service/mapper-service-creation'
import {mapperServiceGetAll} from './mappers-service/mapper-service-get-all'



class ServiceOrganizationServiceCategory {
    async createServiceOrganizationServiceCategory(dtoServiceOrganizationServiceCategoryCreation: DtoOrganizationServiceCategoryCreation, next: NextFunction) {
        try {
            const service = await OrganizationServiceCategory.create({
                name: dtoServiceOrganizationServiceCategoryCreation.name,
                description: dtoServiceOrganizationServiceCategoryCreation.description,
                price: dtoServiceOrganizationServiceCategoryCreation.price,
                organizationId: dtoServiceOrganizationServiceCategoryCreation.organizationId,
                serviceCategoryId: dtoServiceOrganizationServiceCategoryCreation.serviceCategoryId
            })


            return mapperServiceCreation(service)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.bedRequest(error))
            }
        }
    }

    async getAllServiceOrganizationServiceCategories({limit, offset, serviceCategoryId}: DtoOrganizationServiceCategoryGetAll, next: NextFunction) {
        try {
            const organizationServiceCategories = await OrganizationServiceCategory.findAndCountAll({
                limit, offset,
                where: {
                    serviceCategoryId
                },
                include: [Organization, ServiceCategory]
            })
            

            return mapperServiceGetAll(organizationServiceCategories)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.bedRequest(error))
            }
        }
    }
}


export default new ServiceOrganizationServiceCategory()