import {ListingDetailsSchema, FilterListingDetailsSchema} from '@features'
import { AxiosInstance } from 'axios'

export interface StateSchema {
    listingDetails: ListingDetailsSchema
    filterListingDetails: FilterListingDetailsSchema
}

interface thunkMiddleware {
    api: AxiosInstance
}

export interface ThunkApiConfig {
    state: StateSchema,
    extra: thunkMiddleware
}
