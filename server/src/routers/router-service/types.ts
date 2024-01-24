import { Request } from "express";
import {EmptyString} from '@common/types'
import { ServiceAttributes } from "@models/service/types";

export interface CreateServiceRequest extends Request<Record<string, unknown>, EmptyString, ServiceAttributes> {}

export interface GetServices {
    limit?: number,
    offset?: number
    serviceCategoryId: number
}
export interface GetServicesRequest extends Request<Record<string, unknown>, EmptyString, EmptyString, GetServices> {}
