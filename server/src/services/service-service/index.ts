import { DtoOrganizationServiceCategoryCreation, DtoOrganizationServiceCategoryGetAll} from '@dtos/dto-service/types'
import { NextFunction } from 'express'
import ApiError from "@api-error/index";
import OrganizationServiceCategory from '@models/organization-service-category';
import {OrganizationServiceCategoryAttributes} from '@models/organization-service-category/types'
import {mapperServiceCreation} from './mappers-service/mapper-service-creation'



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

    async getAllServiceOrganizationServiceCategories({limit, offset, serviceCategoryId, organizationId}: DtoOrganizationServiceCategoryGetAll, next: NextFunction) {
        try {
            const params: Partial<OrganizationServiceCategoryAttributes> = {}
            if(serviceCategoryId) params.serviceCategoryId = serviceCategoryId
            if(organizationId) params.organizationId = organizationId

            const organizationServiceCategories = await OrganizationServiceCategory.findAndCountAll({
                limit, offset,
                where: params,
            })
            
            return organizationServiceCategories
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.bedRequest(error))
            }
        }
    }
}


export default new ServiceOrganizationServiceCategory()