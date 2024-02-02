import {ListingDetailsSchema} from '../../../../features'

export interface StateSchema {
    listingDetails: ListingDetailsSchema
}

export interface ThunkApiConfig {
    state: StateSchema
}