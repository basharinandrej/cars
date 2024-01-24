import { UserAttributes } from "@models/user/types";
import { ServiceCategoryAttributes } from "@models/service-category/types";
import {Optional} from "sequelize/types";

export interface ServiceAttributes {
    id: number
    name: string
    description: string
    price: number
    userId?: number
    serviceCategoryId?: number
    User?: UserAttributes
    ServiceCategory?: ServiceCategoryAttributes
}


export interface CreationService extends Optional<ServiceAttributes, 'id'> {}