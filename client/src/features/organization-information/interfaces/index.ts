import { StatusOrganization, Bans } from '@shared'

interface Address {
    id: number
    city: string
    house: number
    street: string
}

interface ServiceCategory {
    id: number
    name: string
    OrganizationServiceCategory: {
        id: number,
        name: string,
        description: string,
        price: number,
        organizationId: number,
        serviceCategoryId: number
    }
}

export interface OrganizationInformationResponse {
    id: number | null
    name: string
    phoneNumber: string
    status: StatusOrganization
    ban: Bans
    avatar: string
    addresses: Address[]
    serviceCategories: ServiceCategory[]
}

