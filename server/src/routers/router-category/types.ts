import { Request } from "express";
import { CategoryAttributes } from '@models/category/types'
import {EmptyString} from '@common/types'

export interface CreateCategoryRequest extends Request<Record<string, unknown>, EmptyString, CategoryAttributes> {}

export interface GetCategory {
    limit?: number,
    offset?: number
}
export interface GetCategoriesRequest extends Request<EmptyString, EmptyString, EmptyString, GetCategory> {}
