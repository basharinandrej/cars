import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ListingDetailsResponse} from '../../interfaces/interfaces'
import {fetchListingDetails} from '../async-actions/fetch-listing-details'



export interface ListingDetailsSchema extends ListingDetailsResponse {
  isLoading: boolean
}

const initialState: ListingDetailsSchema = {
  items: null,
  total: 0,
  isLoading: false
}

export const counterSlice = createSlice({
  name: 'listing-details',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchListingDetails.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchListingDetails.fulfilled, (state, action: PayloadAction<ListingDetailsResponse>) => {
            const data = action.payload

            state.isLoading = false
            state.total = data.total
            state.items = data.items
        })
  }
})


export const listingDetailsReducer = counterSlice.reducer