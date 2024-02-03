import {ListingDetailsSchema, FilterListingDetailsSchema} from '@features'

export interface StateSchema {
    listingDetails: ListingDetailsSchema
    filterListingDetails: FilterListingDetailsSchema
}

export interface ThunkApiConfig {
    state: StateSchema
}
