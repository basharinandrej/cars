import { OrganizationServiceCategoryAttributes } from "@models/organization-service-category/types";
import {DtoOrganizationServiceCategoryCreation, DtoOrganizationServiceCategoryGetAll} from './types'
import {ParamsGetAllServices} from '@controllers/controller-organization-service-category/types'
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from "@common/constans";
import {extractAccessToken} from '@common/utils/extract-tokens'
import {serviceToken} from '@services/service-token'

class DtoService {
    getDtoOrganizationServiceCategoryCreation(service: OrganizationServiceCategoryAttributes, authorization: string): DtoOrganizationServiceCategoryCreation {
        const token = extractAccessToken(authorization)
        const {id: organizationId} = serviceToken.validationToken(token)

        return {
            organizationId,
            name: service.name,
            description: service.description,
            price: service.price,
            serviceCategoryId: service.serviceCategoryId
        }
    }


    getDtoOrganizationServiceCategoryGetAll(query:ParamsGetAllServices ): DtoOrganizationServiceCategoryGetAll {

        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
            serviceCategoryId: query.serviceCategoryId,
            organizationId: query.organizationId
        }
    }
}

export default new DtoService()