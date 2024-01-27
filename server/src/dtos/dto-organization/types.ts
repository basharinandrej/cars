import { Pagination } from "@common/types"
import { Bans } from "@common/enums"



export interface DtoOrganizationRegistration {
    name: string
    email: string
    phoneNumber: number
    password: string
    ban: Bans
    fingerPrint: string
}

export interface DtoOrganizationGetAll extends Pagination {}

export interface DtoOrganizationGetOne {
    id: number
}
