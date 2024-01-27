import { UserRoles, Bans } from "@common/enums"
import { Pagination } from "@common/types"

export interface DtoUserRegistration {
    id: number
    name: string
    surname: string
    email: string
    role: UserRoles
    phoneNumber: number
    password: string
    ban: Bans
    fingerPrint: string
    avatar?: string
}

export interface DtoUserLogin {
    email: string
    password: string
    fingerPrint: string
}


export interface DtoUserGetAll extends Pagination {
    role?: UserRoles
}