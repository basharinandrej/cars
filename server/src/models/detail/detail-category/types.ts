import {Optional} from "sequelize/types";

export interface DetailCategoryAttributes {
    id: number
    name: string
}

export interface DetailCategoryCreation extends Optional<DetailCategoryAttributes, 'id'> {}