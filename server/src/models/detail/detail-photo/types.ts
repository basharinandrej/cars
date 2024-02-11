import {Optional} from "sequelize/types";

export interface DetailPhotoAttributes {
    id: number
    url: string


    detailId?: number
    createdAt?: string
}


export interface CreationDetailPhoto extends Optional<DetailPhotoAttributes, 'id'> {}