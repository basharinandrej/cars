import {Optional} from "sequelize/types";
import {UserRoles} from '@common/enums'

export interface UserAttributes {
    id: number
    name: string
    email: string
    role: UserRoles
    phoneNumber: number
    surname?: string // у role=ORGANIZATION нет surname 
    addres?: number
    password: string
    balance?: number
    banType?: number
    avatar?: string
}

export interface UserCreation extends Optional<UserAttributes, 'id'> {}