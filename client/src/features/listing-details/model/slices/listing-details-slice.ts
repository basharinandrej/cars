import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ListingDetailsResponse} from '../../interfaces'

import {fetchInitialListingDetails} from '../async-actions/fetch-initial-listing-details'
import { fetchListingDetailsNextPart } from '../async-actions/fetch-listing-details-next-part'

import {
  DEFAULT_VALUE_LIMIT_LISTING_DETAILS, 
  INITIAL_VALUE_OFFSET_LISTING_DETAILS
} from '../../constans'

import {calcOffset} from '@shared'


export interface ListingDetailsSchema extends Omit<ListingDetailsResponse, 'rows'> {
  items: ListingDetailsResponse['rows']
  isLoading: boolean
  canPaginationMore: boolean
  scrollPostion: number
}

const initialState: ListingDetailsSchema  = {
  items: [],
  count: 0,
  isLoading: false,
  limit: DEFAULT_VALUE_LIMIT_LISTING_DETAILS,
  offset: INITIAL_VALUE_OFFSET_LISTING_DETAILS,
  canPaginationMore: false,
  scrollPostion: 0
}

export const listingDetailsSlice = createSlice({
  name: 'listing-details',
  initialState,
  reducers: {
    keepScrollPosition: (state, action: PayloadAction<number>) => {
      state.scrollPostion = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchInitialListingDetails.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchInitialListingDetails.fulfilled, (state, action: PayloadAction<ListingDetailsResponse>) => {
            const data = action.payload

            state.isLoading = false
            state.items = data.rows
            state.count = data.count
            state.offset = INITIAL_VALUE_OFFSET_LISTING_DETAILS + data.rows?.length
            state.canPaginationMore = data?.count > data.rows?.length
        })


        .addCase(fetchListingDetailsNextPart.pending, (state) => {
          state.isLoading = true
        })
        .addCase(fetchListingDetailsNextPart.fulfilled, (state, action: PayloadAction<any>) => {
          const data = action.payload

          state.isLoading = false
          state.count = data.count
          state.items = state.items.concat(data.rows)
          state.offset = calcOffset(state)
          state.canPaginationMore = data.count > state.items?.length && !!action.payload.rows.length
        })
  }
})

export const {keepScrollPosition} = listingDetailsSlice.actions

export const listingDetailsReducer = listingDetailsSlice.reducer