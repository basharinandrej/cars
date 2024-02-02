import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ListingDetailsResponse} from '../../interfaces/interfaces'
import {fetchListingDetails} from '../async-actions/fetch-listing-details'
import { fetchListingDetailsNextPart } from '../async-actions/fetch-listing-details-next-part'


export interface ListingDetailsSchema extends ListingDetailsResponse {
  isLoading: boolean
  limit: number
  offset: number
  catagoryId: number | null
  modelId: number | null
}

const initialState: ListingDetailsSchema = {
  items: [],
  total: 0,
  isLoading: false,
  limit: 8,
  offset: 0,
  catagoryId: null,
  modelId: null
}

export const listingDetailsSlice = createSlice({
  name: 'listing-details',
  initialState,
  reducers: {
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload
    }
  },
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
        .addCase(fetchListingDetailsNextPart.fulfilled, (state, action: PayloadAction<ListingDetailsResponse>) => {
          const data = action.payload

          state.total = data.total
          state.items = state.items.concat(data.items)
      })
  }
})

export const {setOffset} = listingDetailsSlice.actions

export const listingDetailsReducer = listingDetailsSlice.reducer