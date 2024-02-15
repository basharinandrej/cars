import {Optional} from "sequelize/types";

export interface ServiceCategoryAttributes {
    id: number
    name: string
    description: string
}


export interface CreationServiceCategory extends Optional<ServiceCategoryAttributes, 'id'> {}