import { StatusOrganization, Bans, CommonListing } from "@shared"

export interface Organization {
    id: number,
    name: string,
    phoneNumber: string,
    status: StatusOrganization,
    ban: Bans
    avatar: ''
}

export interface ListingOrganizationsResponse  extends CommonListing{
    items: Organization[],
}