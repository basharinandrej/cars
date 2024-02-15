import {
    ListingDetailsSchema, 
    FilterListingDetailsSchema, 
    DetailInformationSchema,
    ListingOrganizationSchema,
    FilterListingOrganizationsSchema,
    OrganizationInformationSchema
} from '@features'
import {MenuSchema, LogoSchema} from '@entities'
import { AxiosInstance } from 'axios'

export interface StateSchema {
    listingDetails: ListingDetailsSchema
    listingOrganization: ListingOrganizationSchema

    filterListingDetails: FilterListingDetailsSchema
    filterListingOrganization: FilterListingOrganizationsSchema

    detailInformation: DetailInformationSchema
    organizationInformation: OrganizationInformationSchema
    
    menu: MenuSchema,
    logo: LogoSchema
}

interface thunkMiddleware {
    api: AxiosInstance
}

export interface ThunkApiConfig {
    state: StateSchema,
    extra: thunkMiddleware
}
