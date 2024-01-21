import { Request } from "express";
import { DetailAttributes } from '@models/detail/types'
import {EmptyString} from '@common/types'

export interface CreateDetailRequest extends Request<Record<string, unknown>, EmptyString, DetailAttributes> {}

export interface GetDetails {
    limit?: number,
    offset?: number
    categoryId?: number
    modelId?: number
}
export interface GetDetailsRequest extends Request<EmptyString, EmptyString, EmptyString, GetDetails> {}


export interface DetailSearch {
    keyword: string
    limit?: number,
    offset?: number,
    categoryId?: number
    modelId?: number
}
export interface SearchDetailsRequest extends Request<Record<string, unknown>, EmptyString, EmptyString, DetailSearch> {}
