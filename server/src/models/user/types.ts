import {Optional} from "sequelize/types";
import {UserRoles} from '@common/enums'

export interface UserAttributes {
    id: number
    name: string
    surname: string
    email: string
    role: UserRoles
    phoneNumber: number
    addres?: number
    password: string
    balance?: number
    banType?: number
    avatar?: string
}

export interface UserCreation extends Optional<UserAttributes, 'id'> {}