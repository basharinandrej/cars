import { Request } from "express";
import { TypeDetailAttributes } from '@models/type-detail/types'
import {EmptyString} from '@common/types'

export interface CreateTypeDetailRequest extends Request<EmptyString, EmptyString, TypeDetailAttributes> {}

interface GetTypeDetails {
    limit?: number,
    offset?: number
}
export interface GetTypeDetailsRequest extends Request<EmptyString, EmptyString, EmptyString, GetTypeDetails> {}
