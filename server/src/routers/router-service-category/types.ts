import { Request } from "express";
import {EmptyString} from '@common/types'
import { ServiceCategoryAttributes } from "@models/service-category/types";

export interface CreateServiceCategoryRequest extends Request<Record<string, unknown>, EmptyString, ServiceCategoryAttributes> {}

export interface GetServiceCategories {
    limit?: number,
    offset?: number
}
export interface GetServiceCategoriesRequest extends Request<Record<string, unknown>, EmptyString, EmptyString, GetServiceCategories> {}
