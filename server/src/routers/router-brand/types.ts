import { Request } from "express";
import { BrandAttributes } from '@models/brand/types'
import {EmptyString} from '@common/types'
import { SortOrder } from "@common/enums";


export interface CreateBrandRequest extends Request<Record<string, unknown>, EmptyString, BrandAttributes> {}

export interface GetBrands {
    limit?: number,
    offset?: number
    order?: SortOrder
    sort?: string
}

export interface GetBrandsRequest extends Request<Record<string, unknown>, EmptyString, EmptyString, GetBrands> {}

export interface GetOneBrand {
    id: number
}

export interface GetOneBrandRequest extends Request<Record<string, unknown>, EmptyString, EmptyString, GetOneBrand> {}