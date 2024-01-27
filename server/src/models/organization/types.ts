import { Bans } from "@common/enums";
import {Optional} from "sequelize/types";

export interface OrganizationAttributes {
    id: number
    name: string
    email: string
    phoneNumber: number
    password: string
    ban: Bans

    
    avatarId?: string
    addressId?: number
}

export interface OrganizationCreation extends Optional<OrganizationAttributes, 'id'> {}