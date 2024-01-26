import {Optional} from "sequelize/types";

export interface DetailCategoryAttributes {
    id: number
    name: string
}

export interface CreationDetailCategory extends Optional<DetailCategoryAttributes, 'id'> {}