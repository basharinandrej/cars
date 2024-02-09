import { StatusOrganization, Bans } from "@shared"

export interface Organization {
    id: number,
    name: string,
    phoneNumber: string,
    status: StatusOrganization,
    ban: Bans
    avatar: ''
}

export interface ListingOrganizationsResponse {
    items: Organization[],
    total: number
}