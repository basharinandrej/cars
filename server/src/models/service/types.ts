import { OrganizationAttributes } from "@models/organization/types";
import { ServiceCategoryAttributes } from "@models/service/service-category/types";
import {Optional} from "sequelize/types";

export interface ServiceAttributes {
    id: number
    name: string
    description: string
    price: number


    organizationId?: number
    serviceCategoryId?: number

    
    Organization?: OrganizationAttributes
    ServiceCategory?: ServiceCategoryAttributes
}


export interface CreationService extends Optional<ServiceAttributes, 'id'> {}