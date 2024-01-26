import {Optional} from "sequelize/types";
import {UserRoles} from '@common/enums'

export interface UserAttributes {
    id: number
    name: string
    surname: string
    email: string
    role: UserRoles
    phoneNumber: number
    password: string

    avatarId?: number
    banId?: number
}

export interface UserCreation extends Optional<UserAttributes, 'id'> {}