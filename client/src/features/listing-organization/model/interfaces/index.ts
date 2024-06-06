import { Bans } from "@shared"


export interface ParamsFetchListingOrganization {
    limit: number
    offset: number
    status?: string
    serviceCategoryId?: number
    ban: Bans
}