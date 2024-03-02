import { Pagination, PayloadToken } from "@common/types"
import { Bans, StatusOrganization } from "@common/enums"



export interface DtoOrganizationRegistration {
    name: string
    email: string
    phoneNumber: number
    password: string
    ban: Bans
    status: StatusOrganization
    avatar?: string
}

export interface DtoOrganizationGetAll extends Pagination {
    status: StatusOrganization
    serviceCategoryId: number
}

export interface DtoOrganizationGetOne {
    id: number
}

export interface DtoOrganizationLogin {
    email: string
    password: string
}

export interface DtoInitOrganization extends PayloadToken {}

