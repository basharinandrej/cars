import { Request } from "express";
import { ModelAttributes } from '@models/model/types'
import {EmptyString} from '@common/types'

export interface CreateModelRequest extends Request<EmptyString, EmptyString, ModelAttributes> {}

interface GetModels {
    limit?: number,
    offset?: number
}
export interface GetModelsRequest extends Request<EmptyString, EmptyString, EmptyString, GetModels> {}
