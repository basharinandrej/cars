import OrganizationServiceCategory from "@models/organization-service-category";
import {Optional} from "sequelize/types";

export interface ServiceCategoryAttributes {
    id: number
    name: string
    description: string

    OrganizationServiceCategory?: OrganizationServiceCategory
}


export interface CreationServiceCategory extends Optional<ServiceCategoryAttributes, 'id'> {}