import { UserRoles } from "@common/enums"

export interface RegistrationUserDto {
    id: number
    name: string
    surname: string
    email: string
    role: UserRoles
    phoneNumber: number
    password: string
    balance?: number
    banType?: number
    avatar?: string
    addres?: number
}

export interface LoginUserDto {
    email: string
    password: string
}


export interface GetAllUserDto {
    limit: number, 
    offset: number,
    role?: UserRoles
}