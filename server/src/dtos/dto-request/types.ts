import { Pagination } from '@common/types';
import { StatusRequest } from '@models/request/types';


export interface DtoRequestCreation {
    description: string
    senderId: number
    recipienId: number
    serviceId: number
    status: StatusRequest
}

export interface DtoRequestsGetAll extends Pagination {
    userId: number
}
export interface DtoRequestGetOne {
    id: number
}