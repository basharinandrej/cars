import { Pagination } from "@common/types"
import { Bans, StatusOrganization } from "@common/enums"



export interface DtoOrganizationRegistration {
    name: string
    email: string
    phoneNumber: number
    password: string
    ban: Bans
    fingerPrint: string
    status: StatusOrganization
    avatar?: string
}

export interface DtoOrganizationGetAll extends Pagination {}

export interface DtoOrganizationGetOne {
    id: number
}
