import {Optional} from "sequelize/types";

export interface PostAttributes {
    id: number
    name: string
    offer: string

    
    organizationId?: number
}


export interface CreationPost extends Optional<PostAttributes, 'id'> {}