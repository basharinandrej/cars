import { RequestAttributes, StatusRequest } from '@models/request/types';
import {ParamsRequestGetAll, ParamsRequestGetById} from '@controllerscontroller-request/types'
import {DtoRequestCreation, DtoRequestsGetAll, DtoRequestGetOne} from './types'
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from "@common/constans";

class DtoRequest {
    getDtoRequestCreation(request: RequestAttributes): DtoRequestCreation {
        return {
            description: request.description,
            recipienId: request.recipientId,
            serviceId: request.serviceId,
            senderId: request.senderId,
            status: StatusRequest.IN_VIEWING
        }
    }

    getDtoRequestGetAll(query: ParamsRequestGetAll): DtoRequestsGetAll {
        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET
        }
    }

    getDtoRequestGetOne(query: ParamsRequestGetById): DtoRequestGetOne {
        return {
            id: query.id
        }
    }
}

export default new DtoRequest()