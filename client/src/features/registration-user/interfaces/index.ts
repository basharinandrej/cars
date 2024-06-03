import { Bans, UserRoles } from "@shared"


export interface FormRegistrationUserValueTypes {
    name: string
    surname: string
    password: string
    passwordDouble: string
    email: string
    phoneNumber: number
}

export interface RegistrationUserResponse {
    user: {
        id: number
        name: string
        surname: string
        email: string
        role: UserRoles
        phoneNumber: number
        ban: Bans
    }
}