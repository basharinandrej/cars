import {Optional} from "sequelize/types";

export interface OrganizationAttributes {
    id: number
    name: string
    email: string
    phoneNumber: number
    password: string

    
    avatarId?: string
    banId?: number
    addressId?: number
}

export interface OrganizationCreation extends Optional<OrganizationAttributes, 'id'> {}