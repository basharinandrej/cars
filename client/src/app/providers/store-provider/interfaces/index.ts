import {
    ListingDetailsSchema, 
    FilterListingDetailsSchema, 
    DetailInformationSchema,
    ListingOrganizationSchema,
    FilterListingOrganizationsSchema,
    OrganizationInformationSchema,
    LoginUserSchema
} from '@features'
import {MenuSchema, LogoSchema, ProfileSchema, SidebarSchema} from '@entities'
import { AxiosInstance } from 'axios'

export interface StateSchema {
    listingDetails: ListingDetailsSchema
    listingOrganization: ListingOrganizationSchema

    filterListingDetails: FilterListingDetailsSchema
    filterListingOrganization: FilterListingOrganizationsSchema

    detailInformation: DetailInformationSchema
    organizationInformation: OrganizationInformationSchema
    
    loginUser: LoginUserSchema,
    profile: ProfileSchema,

    sidebar: SidebarSchema,
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
