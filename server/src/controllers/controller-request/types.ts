import {Pagination} from '@common/types'


export interface ParamsRequestGetAll extends Pagination {
    senderId: number
    recipientId: number
}


export interface ParamsRequestGetById{
    id: number
}

