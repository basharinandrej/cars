import { Request } from "express";
import { DetailAttributes } from '@models/detail/types'
import {EmptyString} from '@common/types'

export interface CreateDetailRequest extends Request<Record<string, unknown>, EmptyString, DetailAttributes> {}

interface GetDetails {
    limit?: number,
    offset?: number
}
export interface GetDetailsRequest extends Request<EmptyString, EmptyString, EmptyString, GetDetails> {}
