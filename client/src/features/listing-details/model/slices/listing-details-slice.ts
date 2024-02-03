import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ListingDetailsResponse} from '../../interfaces/interfaces'

import {fetchInitialListingDetails} from '../async-actions/fetch-initial-listing-details'
import { fetchListingDetailsNextPart } from '../async-actions/fetch-listing-details-next-part'
import { fetchSearchListingDetailsNextPart } from '../async-actions/fetch-search-listing-details-next-part'
import {fetchInitialSearchListingDetails} from '../async-actions/fetch-initial-search-listing-details'

import {DEFAULT_VALUE_LIMIT, INITIAL_VALUE_OFFSET} from '../../constans'

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
  limit: DEFAULT_VALUE_LIMIT,
  offset: INITIAL_VALUE_OFFSET,
  catagoryId: null,
  modelId: null
}

export const listingDetailsSlice = createSlice({
  name: 'listing-details',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchInitialListingDetails.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchInitialListingDetails.fulfilled, (state, action: PayloadAction<ListingDetailsResponse>) => {
            const data = action.payload


            state.isLoading = false
            state.items = data.items

            state.total = data.total
            state.offset = INITIAL_VALUE_OFFSET + data.items?.length
        })



        .addCase(fetchInitialSearchListingDetails.pending, (state) => {
          state.isLoading = true
        })
        .addCase(fetchInitialSearchListingDetails.fulfilled, (state, action: PayloadAction<ListingDetailsResponse>) => {
          const data = action.payload


          state.isLoading = false
          state.items = data.items

          state.total = data.total
          state.offset = INITIAL_VALUE_OFFSET + data.items?.length
        })


        .addCase(fetchSearchListingDetailsNextPart.pending, (state) => {
          state.isLoading = true
        })
        .addCase(fetchSearchListingDetailsNextPart.fulfilled, (state, action: PayloadAction<ListingDetailsResponse>) => {
          const data = action.payload
          const newOffset = state.offset + state.limit

          state.total = data.total
          state.items = state.items.concat(data.items)
          state.offset = newOffset > state.total ? state.total : newOffset
        })



        .addCase(fetchListingDetailsNextPart.pending, (state) => {
          state.isLoading = true
        })
        .addCase(fetchListingDetailsNextPart.fulfilled, (state, action: PayloadAction<ListingDetailsResponse>) => {
          const data = action.payload
          const newOffset = state.offset + state.limit

          state.total = data.total
          state.items = state.items.concat(data.items)
          state.offset = newOffset > state.total ? state.total : newOffset
        })

  }
})


export const listingDetailsReducer = listingDetailsSlice.reducer