import { UserRoles, Bans } from "@common/enums"
import { Pagination, PayloadToken } from "@common/types"

export interface DtoUserRegistration {
    id: number
    name: string
    surname: string
    email: string
    role: UserRoles
    phoneNumber: number
    password: string
    ban: Bans
    avatar?: string
}

export interface DtoUserLogin {
    email: string
    password: string
}


export interface DtoUserGetAll extends Pagination {
    role?: UserRoles
}

export interface DtoInitUser extends PayloadToken {}