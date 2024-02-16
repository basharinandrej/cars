import { StatusOrganization, Bans, CommonListing } from "@shared"

interface Address {
    id: number,
    city: string,
    house: number,
    street: string
}

export interface Organization {
    id: number,
    name: string,
    phoneNumber: string,
    status: StatusOrganization,
    ban: Bans,
    avatar: ''
    addresses: Address[]
}

export interface ListingOrganizationsResponse  extends CommonListing{
    items: Organization[],
}

export interface ServiceCategory {
    label: string,
    value: number
}
export interface ServiceCategoryResponse {
    total: number,
    items: ServiceCategory[]
}