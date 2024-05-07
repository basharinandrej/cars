import {Optional} from "sequelize/types";
import {UserRoles, Bans} from '@common/enums'

export interface UserAttributes {
    id: number
    name: string
    surname: string
    email: string
    role: UserRoles
    phoneNumber: number
    password: string
    ban: Bans
    
    createdAt?: string
    avatarId?: number
}

export interface UserCreation extends Optional<UserAttributes, 'id'> {}