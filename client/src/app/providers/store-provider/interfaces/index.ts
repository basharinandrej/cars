import {ListingDetailsSchema, FilterListingDetailsSchema} from '@features'
import {MenuSchema, LogoSchema} from '@entities'
import { AxiosInstance } from 'axios'

export interface StateSchema {
    listingDetails: ListingDetailsSchema
    filterListingDetails: FilterListingDetailsSchema
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
