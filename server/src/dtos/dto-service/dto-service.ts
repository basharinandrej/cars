import { ServiceAttributes } from "@models/service/types";
import {DtoServiceCreation, DtoServiceGetAll} from './types'
import {ParamsGetAllServices} from '@controllerscontroller-service/types'
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from "@common/constans";
import {extractAccessToken} from '@common/utils/extract-tokens'
import {serviceToken} from '@services/service-token'

class DtoService {
    getDtoServiceCreation(service: ServiceAttributes, authorization: string): DtoServiceCreation {
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


    getDtoServiceGetAll(query:ParamsGetAllServices ): DtoServiceGetAll {

        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
            serviceCategoryId: query.serviceCategoryId
        }
    }
}

export default new DtoService()