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
    senderId: number
    recipientId: number
}
export interface DtoRequestGetOne {
    id: number
}
export interface DtoRequestUpdation {
    id: number
    status: StatusRequest
    description: string
}