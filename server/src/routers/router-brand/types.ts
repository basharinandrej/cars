import { Request } from "express";
import { BrandAttributes } from '@models/brand/types'
import {EmptyString} from '@common/types'


export interface CreateBrandRequest extends Request<Record<string, unknown>, EmptyString, BrandAttributes> {}

interface GetBrands {
    limit?: number,
    offset?: number
}

export interface GetBrandsRequest extends Request<EmptyString, EmptyString, EmptyString, GetBrands> {}
