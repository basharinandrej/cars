import {Optional} from "sequelize/types";
import {UserRoles, Bans, DetailWears} from '@common/enums'

export interface UserAttributes {
    id: number
    name: string
    surname: string
    email: string
    role: UserRoles
    phoneNumber: number
    password: string
    ban: Bans
    wear: DetailWears

    avatarId?: number
}

export interface UserCreation extends Optional<UserAttributes, 'id'> {}