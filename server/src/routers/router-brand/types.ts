import { Request } from "express";
import { BrandAttributes } from '@models/brand/types'
import {EmptyString} from '@common/types'


export interface CreateBrandRequest extends Request<EmptyString, EmptyString, BrandAttributes> {}

interface GetBrands {
    limit?: number,
    offset?: number
}

export interface getBrandsRequest extends Request<EmptyString, EmptyString, EmptyString, GetBrands> {}
