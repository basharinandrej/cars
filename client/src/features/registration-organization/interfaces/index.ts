import { Bans, StatusOrganization } from "@shared"

export interface FormRegistrationOrganizationValueTypes {
    name: string
    password: string
    passwordDouble: string
    email: string
    phoneNumber: number
    house: number
    street: string
}

export interface RegistrationOrganizationResponse {
    organization: {
        id: number
        name: string
        email: string
        phoneNumber: number
        ban: Bans
        status: StatusOrganization
        avatar: string
    }
    address: {
        id: number
        city: string
        street: string
        house: number
        organization: number
    }
}