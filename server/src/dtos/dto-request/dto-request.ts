import { RequestAttributes } from '@models/request/types';
import {ParamsRequestGetAll} from '@controllerscontroller-request/types'
import {DtoRequestCreation, DtoRequestsGetAll} from './types'
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from "@common/constans";


class DtoRequest {
    getDtoRequestCreation(request: RequestAttributes): DtoRequestCreation {
        return {
            description: request.description,
            recipienId: request.recipientId,
            serviceId: request.serviceId,
            senderId: request.senderId
        }
    }

    getDtoRequestGetAll(query: ParamsRequestGetAll): DtoRequestsGetAll {
        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET
        }
    }
}

export default new DtoRequest()