import { StatusOrganization, Bans } from '@shared'
import {IService} from '@entities'

interface Address {
    id: number
    city: string
    house: number
    street: string
}

interface ServiceCategory {
    id: number
    name: string
    service: IService
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

