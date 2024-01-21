import {Optional} from "sequelize/types";

export interface CategoryAttributes {
    id: number
    name: string
    modelType?: string
}

export interface CreationCategory extends Optional<CategoryAttributes, 'id'> {}