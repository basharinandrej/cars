import {ListingDetailsSchema} from '../slices/listing-details-slice'

export const calcOffset = (state: ListingDetailsSchema) => {
    const newOffset = state.offset + state.limit
    return newOffset > state.total ? state.total : newOffset
}