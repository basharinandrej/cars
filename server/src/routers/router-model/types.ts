import { Request } from "express";
import { ModelAttributes } from '@models/model/types'
import {EmptyString} from '@common/types'

export interface CreateModelRequest extends Request<Record<string, unknown>, EmptyString, ModelAttributes> {}

export interface GetModels {
    limit?: number,
    offset?: number
    brandId?: number
}
export interface GetModelsRequest extends Request<Record<string, unknown>, EmptyString, EmptyString, GetModels> {}


export interface GetOneModel {
    id: number
}

export interface GetOneModelRequest extends Request<Record<string, unknown>, EmptyString, EmptyString, GetOneModel> {}
