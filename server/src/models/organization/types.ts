import { Bans, StatusOrganization } from "@common/enums";
import {Optional} from "sequelize/types";
import Address from '@models/address';
import ServiceCategory from "@models/service-category";

export interface OrganizationAttributes {
    id: number
    name: string
    email: string
    phoneNumber: number
    password: string
    ban: Bans
    status: StatusOrganization 
    avatar?: string
    
    Addresses?: Address[]
    serviceCategories?: ServiceCategory[]
    createdAt?: number
}

export interface OrganizationCreation extends Optional<OrganizationAttributes, 'id'> {}