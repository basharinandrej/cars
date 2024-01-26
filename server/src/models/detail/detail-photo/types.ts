import {Optional} from "sequelize/types";

export interface DetailPhotoAttributes {
    id: number
    url: string


    detailId?: number
}


export interface CreationDetailPhoto extends Optional<DetailPhotoAttributes, 'id'> {}