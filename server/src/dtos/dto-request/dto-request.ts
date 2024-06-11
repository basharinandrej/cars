import { RequestAttributes, StatusRequest } from '@models/request/types';
import {ParamsRequestGetAll, ParamsRequestGetById} from '@controllerscontroller-request/types'
import {DtoRequestCreation, DtoRequestsGetAll, DtoRequestGetOne, DtoRequestUpdation} from './types'
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from "@common/constans";

class DtoRequest {
    getDtoRequestCreation(request: RequestAttributes): DtoRequestCreation {
        return {
            description: request.description,
            recipienId: request.recipientId,
            //@ts-ignore
            serviceId: request.serviceId,
            senderId: request.senderId,
            status: StatusRequest.IN_VIEWING
        }
    }

    getDtoRequestGetAll(query: ParamsRequestGetAll): DtoRequestsGetAll {
        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
            senderId: query.senderId,
            recipientId: query.recipientId
        }
    }

    getDtoRequestGetOne(query: ParamsRequestGetById): DtoRequestGetOne {
        return {
            id: query.id
        }
    }

    getDtoRequestUpdation(request: RequestAttributes): DtoRequestUpdation {
        return {
            id: request.id,
            status: request.status,
            description: request.description
        }
    }
}

export default new DtoRequest()