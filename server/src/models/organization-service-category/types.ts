import { OrganizationAttributes } from "@models/organization/types";
import { ServiceCategoryAttributes } from "@models/service-category/types";
import {Optional} from "sequelize/types";

export interface OrganizationServiceCategoryAttributes {
    id: number
    name: string
    description: string
    price: number


    organizationId?: number
    serviceCategoryId?: number

    
    Organization?: OrganizationAttributes
    ServiceCategory?: ServiceCategoryAttributes
}


export interface CreationOrganizationServiceCategory extends Optional<OrganizationServiceCategoryAttributes, 'id'> {}