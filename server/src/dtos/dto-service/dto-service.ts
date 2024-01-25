import { ServiceAttributes } from "@models/service/types";
import {DtoServiceCreation, DtoServiceGetAll} from './types'
import {GetServices} from '@routers/router-service/types'
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from "@common/constans";

class DtoService {
    getDtoServiceCreation(service: ServiceAttributes): DtoServiceCreation {

        //userId - нужно брать из токена
        return {
            userId: service.userId,
            name: service.name,
            description: service.description,
            price: service.price,
            serviceCategoryId: service.serviceCategoryId
        }
    }


    getDtoServiceGetAll(query:GetServices ): DtoServiceGetAll {

        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
            serviceCategoryId: query.serviceCategoryId
        }
    }
}

export default new DtoService()