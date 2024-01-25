import { Request } from "express";
import { RequestAttributes } from '@models/request/types'
import {EmptyString} from '@common/types'

export interface CreateRequestRequest extends Request<Record<string, unknown>, EmptyString, RequestAttributes> {}

export interface GetRequests {
    limit?: number,
    offset?: number
}
export interface GetRequestsRequest extends Request<Record<string, unknown>, EmptyString, EmptyString, GetRequests> {}


export interface GetByIdRequest {
    id: number
}

export interface GetByIdRequestRequest extends Request<Record<string, unknown>, EmptyString, EmptyString, GetByIdRequest> {}
